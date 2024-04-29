import { AllowViewAndEditsForFileOwner } from "./policies/allow-edits-by-owner";
import { DenyAccessForDeletedUser } from "./policies/deny-access-deleted-user";
import { DenyEditsForRestrictedTeamUser } from "./policies/deny-edits-for-restricted-team-user-policy";

export const ALL_POLICIES = [
  new DenyEditsForRestrictedTeamUser(),
  new AllowViewAndEditsForFileOwner(),
  new DenyAccessForDeletedUser()
]