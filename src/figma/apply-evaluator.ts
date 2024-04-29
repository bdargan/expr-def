import { get } from 'lodash'
import { ExpressionDef, Value, BinaryExpressionDef, AndExpressionDef, OrExpressionDef, NotExpressionDef, FieldName } from './model'
import { getContextPath, userContextPath } from '../domain-models'

export interface Dictionary<T> {
  [Key: string]: T
}

export class ApplyEvaluator {
  constructor() {}

  public static evaluate(expression: ExpressionDef, data: Dictionary<Dictionary<Value>>): boolean {
    console.log('evaluate', JSON.stringify(expression, null, 2), JSON.stringify(data, null, 2))
    return evalExpressionDef(expression, data)
  }
}

export function isAndExpr(expr: ExpressionDef): expr is AndExpressionDef {
  return (expr as AndExpressionDef).and !== undefined
}
export function isOrExpr(expr: ExpressionDef): expr is OrExpressionDef {
  return (expr as OrExpressionDef).or !== undefined
}
export function isNotExpr(expr: ExpressionDef): expr is NotExpressionDef {
  return (expr as NotExpressionDef).not !== undefined
}

export function isBinaryExpr(expr: ExpressionDef): expr is BinaryExpressionDef {
  return (expr as BinaryExpressionDef).length === 3
}

function evalExpressionDef(expr: ExpressionDef, data: Dictionary<Dictionary<Value>>): boolean {
  // Recursively walk through ExpressionDefs
  if (isAndExpr(expr)) {
    return expr.and.every((subExpr: ExpressionDef) => evalExpressionDef(subExpr, data))
  }
  if (isOrExpr(expr)) {
    return expr.or.some((subExpr: ExpressionDef) => evalExpressionDef(subExpr, data))
  }
  if (isNotExpr(expr)) {
    return !expr.not.every((subExpr: ExpressionDef) => evalExpressionDef(subExpr, data))
  }

  if (expr instanceof Array) {
    // Evaluate BinaryExpressionDef
    const [leftKey, operation, rightKeyOrValue] = expr

    // Find values in data using provided keys
    const leftValue: Value = getValueFromKey(leftKey, data)
    const rightValue: Value = getValueFromKeyOrValue(rightKeyOrValue, data)
    
    console.log('evaluating', leftValue, operation, rightValue)
    switch (operation) {
      case '=':
        return leftValue === rightValue
      case '<>':
        return rightValue === null ? false : leftValue !== rightValue
      case '>':
        return leftValue > rightValue
      case '<':
        return leftValue < rightValue
      case '>=':
        return leftValue >= rightValue
      case '<=':
        return leftValue <= rightValue
      default:
        throw new Error(`Unsupported operation: ${operation}`)
    }
  }
}

//eg. file.owner_id = user.id
//start with one level, because I don't need nested Dictionary complexity
//fieldName | Value | RefObject

//eg. file.owner_id = user.id
export type RefObject = { ref: FieldName; type: "field" }
export function getValueFromKey(keyOrValue: RefObject| Value|null, data: Dictionary<Dictionary<Value>>): Value {
  //Find values in data using provided keys
  if (keyOrValue instanceof Object && 'ref' in keyOrValue) {
    const { ref } = keyOrValue
    const [resource, path] = ref.split('.')
    return get(data[resource], path) ?? null
  }

  if (typeof keyOrValue === 'string') {
    const [resource] = keyOrValue.split('.')
    const resolvedContext = getContextPath(resource, data)
    return get(resolvedContext, keyOrValue) ?? keyOrValue ?? null
  }

  if (keyOrValue === null) {
  return keyOrValue
  }
}

export function getValueFromKeyOrValue(keyOrValue: RefObject| Value|null, data: Dictionary<Dictionary<Value>>): Value {
  //Find values in data using provided keys
  if (keyOrValue instanceof Object && 'ref' in keyOrValue) {
    const { ref } = keyOrValue
    const [resource, path] = ref.split('.')
    const resolvedContext = getContextPath(resource, data)
    return get(resolvedContext, path) ?? null
  }

  if (typeof keyOrValue === 'string') {
    const [resource, path] = keyOrValue.split('.')
    if (resource && path) {
      const resolvedContext = getContextPath(resource, data)
      return get(resolvedContext, path) ?? keyOrValue ?? null
    }
    return keyOrValue ?? null
  }

  if (keyOrValue === null) {
  return keyOrValue
  }
}

//{
//   "file": ["id", "name", "created_at", "deleted_at"],
//   "team": ["id", "permission", "created_at"],
//   "org": ["id", "public_link_permission"],
//   "user": ["id", "email"],
//   "team_role": ["id", "level"],
//   "org_user": ["id", "role"]
// }
//


export const parseDependences = (expr: ExpressionDef): Record<string, string[]> => {
  if (expr === null) {
    return {}
  }
  if (Array.isArray(expr)) {
    const [field, _, value] = expr
    return { field: [field] }
  }
  if (isOrExpr(expr)) {
    return expr.or.reduce((memo: any, subExpr: any) => {
      return { ...memo, ...parseDependences(subExpr) }
    }, {})
  }
  if (isAndExpr(expr)) {
    return expr.and.reduce((memo: any, subExpr: any) => {
      return { ...memo, ...parseDependences(subExpr) }
    }, {})
  }
  if (expr.not) {
    return expr.not.reduce((memo: any, subExpr: any) => {
      return { ...memo, ...parseDependences(subExpr) }
    }, {})
  }
  return {}
}
