
export type FieldName = string //"user" | "file" & DocumentFields & FileFields

export type Value = string | boolean | number | Date | null;

export type ExpressionArgumentRef = { type: 'field'; ref: FieldName }
export type BinaryExpressionDef = [FieldName, '=' | '<>' | '>' | '<' | '>=' | '<=' | 'in', Value | ExpressionArgumentRef]


export type OrExpressionDef = {
  or: ExpressionDef[]
}

export type AndExpressionDef = {
  and: ExpressionDef[]
}

export type NotExpressionDef = {
  not: ExpressionDef[]
}

export type ExpressionDef = BinaryExpressionDef  | OrExpressionDef  | AndExpressionDef  | NotExpressionDef

export type Effect = "allow" | "deny"
export type ResourceType = "document" | "file" | "user" | "team"
export type PrincipalType = "user" | "team"

export type Permission = FilePermission | DocumentPermission

// export type PermissionName = "can_edit" | "can_view" | "can_comment" | "can_share" | "can_export" | "can_invite" | "can_manage" | "can_view_version_history" | "can_view_design_system" | "can_view_design"
export enum FilePermission {
  can_edit = "can_edit",
  can_view = "can_view",
  can_edit_canvas = "can_edit_canvas",
}

export enum DocumentPermission {
  can_edit = 'can_editCon',
  can_view = 'can_view',
  can_comment = 'can_comment',
  can_share = 'can_share',
  can_export = 'can_export',
  can_invite = 'can_invite',
  can_manage = 'can_manage',
  can_view_version_history = 'can_view_version_history',
  can_view_design_system = 'can_view_design_system',
  can_view_design = 'can_view_design'
}

export interface Policy {
  description: string
  applyFilter: ExpressionDef
  effect: Effect
  resourceType: ResourceType
  permissions: Permission[]
}

export interface Resource {
  id: string
  type: ResourceType
}


//export type Principal = UserPrincipal | TeamPrincipal
export interface Principal {
  id: string
  type: PrincipalType
  name?: string
  //group_id: string
}

export type UserPrincipal = {
  id: string
  type: "user"
  name?: string
}

export type TeamPrincipal = {
  id: string
  type: "team"
  name?: string
}
