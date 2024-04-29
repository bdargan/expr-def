import { ExpressionDef, Effect, ResourceType, FilePermission, Permission, Policy,  } from '../model';


export class DenyEditsForRestrictedTeamUser implements Policy {
  readonly description: string
  readonly permissions: Permission[]
  readonly resourceType: ResourceType;
  readonly applyFilter: ExpressionDef
  readonly effect: Effect;
  constructor() {
    this.description = 'This user has a viewer-restricted seat in a Pro plan, so will not be able to edit the file.'
    this.resourceType = "document"
    this.effect = 'allow'
    this.permissions = [FilePermission.can_edit_canvas]
    this.applyFilter = {
        "and": [
          {"not": [["file.orgId", '<>', null]]},
          {"or": [
            {"and": [["file.editor_type", "=", "design"], ["team_user.design_paid_status", "=", "restricted"]]},
            {"and": [["file.editor_type", "=", "figjam"], ["team_user.figjam_paid_status", "=", "restricted"]]}
          ]
        }
      ]
  }      }
}  
    