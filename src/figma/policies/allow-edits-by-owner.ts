import { ExpressionDef, Effect, ResourceType, FilePermission, Permission, Policy,  } from '../model';

export class AllowViewAndEditsForFileOwner implements Policy {
  readonly description: string
  readonly permissions: Permission[]
  readonly resourceType: ResourceType;
  readonly applyFilter: ExpressionDef
  readonly effect: Effect;
  constructor() {
    this.description = 'This user is an owner and can edit the file.'
    this.resourceType = "file"
    this.effect = 'allow'
    this.permissions = [FilePermission.can_edit, FilePermission.can_view, ]
    this.applyFilter = 
        [ "user", "=", "file.owner"]
  }      
}  
    