import { parseDependences } from "./apply-evaluator"
import { PermissionFn, hasPermission } from "./has-permission";
import { Policy, FilePermission, Principal,  } from './model';
import { File } from '../domain-models';
import { User } from "../domain-models";

const dataLoading = {
  // Resources known when calling `has_permission?`
  "file": ["id", "name", "owner_id", "created_at", "deleted_at"],
  "user": ["id", "email"],
  
  // Resources loaded through `file` object
  "team": ["id", "permission", "created_at"], // file.team_id
  "org": ["id", "public_link_permission"],    // file.org_id

  // Resources loaded through combination of `file` and `user`
  "team_role": ["id", "level"],    // file.team_id + user.id
  "org_user": ["id", "role"]       // file.org     + user.id
}

export type PermissionCheck = {
  name: string,
  policyFilter?: Policy[],
  checkFn: () => Promise<boolean>,
  expected: boolean

}

const aliceFile: File = {
  id: '1',
  type: 'file',
  name: 'File 1',
  url: 'https://file1.com',
  team_id: 'team3',
  org_id: 'org6', 
  owner_id: 'alice'
}

//Principal represents a user, or a role or group
const alice: User = {
  id: 'alice',
  type: 'user',
  email: 'alice@gmail.com',
  team_id: 'team3'
}

const guest: User = {
  id: '3',
  type: 'user',
  email: 'guest',
  team_id: null
}

const inactiveUser: User = {
  id: 'deleted',
  type: 'user',
  email: 'deleted',
  team_id: null,
  deleted_at: new Date()
}
const permissionChecks: PermissionCheck[] = [
  // {
  //   name: 'allow owner view file 1?',
  //   checkFn: () => hasPermission(aliceFile, alice, FilePermission.can_view),
  //   expected: true
  // },
  // {
  //   name: 'deny guest view file owned by another',
  //   checkFn: () => hasPermission(aliceFile, guest, FilePermission.can_view),
  //   expected: false
  // },
  // {
  //   name: 'deny deleted user from view file',
  //   checkFn: () => hasPermission(aliceFile, inactiveUser, FilePermission.can_view),
  //   expected: false
  // },
  {
    name: 'allow user to view a file shared by another',
    checkFn: () => hasPermission(aliceFile, guest, FilePermission.can_view),
    expected: true
  }
  // {name: 'can someone without privs view file 1?', checkFn: () => hasPermission(aliceFile, guest, FilePermission.can_view), expected: false},
]

export const runPermissionChecks = async () => {
  permissionChecks.map(async ({name, checkFn, expected}) => {
    console.log(`Checking: ${name}`)
    const actual = await checkFn()
    const passed = actual === expected
    console.log(`${passed ? '✅' : '❌'} ${name}`)
    
  })
}