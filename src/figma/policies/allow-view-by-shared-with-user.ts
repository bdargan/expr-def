import { ExpressionDef, Effect, ResourceType, FilePermission, Permission, Policy } from '../model'

export class AllowViewByShareWithUser implements Policy {
  readonly description: string
  readonly permissions: Permission[]
  readonly resourceType: ResourceType
  readonly applyFilter: ExpressionDef
  readonly effect: Effect
  constructor() {
    this.description = 'Allow view of file by explicit sharing.'
    this.resourceType = 'file'
    this.effect = 'allow'
    this.permissions = [FilePermission.can_view]
    this.applyFilter = ['user', 'in', 'file.shared_viewers']
  }
}
