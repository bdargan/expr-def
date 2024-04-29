import { ALL_POLICIES } from "./policies-data"
import {ApplyEvaluator, Dictionary, parseDependences } from "./apply-evaluator"
import {DatabaseLoader} from "./database-loader"
import { FieldName, Permission, Policy, Value } from "./model"
import { User, File, fileContextPath, userContextPath } from "../domain-models"

export const DENY = 'deny'
export const ALLOW = 'allow'

export type RefObject = { id: string; type: FieldName }

export type PermissionFn = (resource: File, user: User, permission: Permission) => Promise<boolean>;

export type PermissionEvaluationResult = {
  [key: string]: boolean
}

export type PermissionResult = boolean //|[boolean, PermissionEvaluationResult]
export type HasPermissionReturnType = Promise<PermissionResult>

// merging these to help identify resources to load
export const resolveContext = (resource: File, user: User): Dictionary<Value> => {
  const context: Dictionary<Value> = {...fileContextPath(resource), ...userContextPath(user) }

  if (context['org'] && context['user']) {
    // context['org_user'] = [context['org'], context['user']]
  }
  if (context['team'] && context['user']) {
    //     context[team_role] = [context[team], context[user]]}
  }
  return context
}

export const hasPermission: PermissionFn = async (resource: File, user: User, permission: Permission): Promise<PermissionResult> => {

  // console.log('hasPermission', resource, user, permission)
  
  const resolvedContext = {file: {...resource} as Dictionary<Value>, user: {...user} as Dictionary<Value>} //resolveContext(resource, user)
  const policies = ALL_POLICIES
         .filter((p: Policy) => p.permissions.includes(permission))
  

  const resourcesToLoad = policies.reduce((memo, p) => {
    const dataDependencies = parseDependences(p.applyFilter)
    return {...memo, ...dataDependencies}
  })
  
  // ["file.deleted_at", "<>", null]

  const loadedResources = resolvedContext //await DatabaseLoader.loadAll(resourcesToLoad)
  console.log('resources to load', resourcesToLoad)

  // Bisect policies into DENY and ALLOW policies
  const [denyPolicies, allowPolicies] = policies
                      .map((p:Policy) => p.effect === DENY ? [p, null] : [null, p])
                      .reduce((memo, [deny, allow]) => {
                        return [ [...memo[0], deny].filter((p) => !!p), [...memo[1], allow].filter((p) => !!p) ]
                      }, [[], []])

  console.log('deny policies', denyPolicies?.map((p: Policy) => p.description))
  console.log('allow policies', allowPolicies?.map((p: Policy) => p.description)) 
  // Return false if any of the DENY policies evaluate to true
  const shouldDeny = denyPolicies.some((p: Policy) => {
    return ApplyEvaluator.evaluate(p.applyFilter, loadedResources )
  })
  if (shouldDeny) { console.log('shouldDeny'); return false }

  // Return true if any of the ALLOW policies evaluate to true
  return allowPolicies.some((p: Policy) => {
     return ApplyEvaluator.evaluate( p.applyFilter, loadedResources)
  })
}


