import { ExpressionDef, Effect, ResourceType, FilePermission, Permission, Policy,  } from '../model';

export class DenyAccessForDeletedUser implements Policy {
  readonly description: string
  readonly permissions: Permission[]
  readonly resourceType: ResourceType;
  readonly applyFilter: ExpressionDef
  readonly effect: Effect;
  constructor() {
    this.description = 'User must not be deleted to access resource.'
    this.resourceType = "file"
    this.effect = 'deny'
    this.permissions = [FilePermission.can_edit, FilePermission.can_view, ]
    this.applyFilter = 
        [ "user.deleted_at", "<>", "null"]
  }      
}  
    