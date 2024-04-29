import {  File, Org } from '../../domain-models';
import { FilePermission } from '../model';
export const files: File[] = [
{
id: "1",
type: "file",
name: "File 1",
url: "https://file1.com",
team_id: "team1",
org_id: "org1",
owner_id: "user1"
},
{
  id: "2",
  type: 'file',
  name: "File 2",
  url: "https://file2.com",
  team_id: "team2",
  org_id: "org1",
  owner_id: "user2"
  },
  {
    id: "3",
    type: 'file',
    name: "File 3",
    url: "https://file3.com",
    team_id: null,
    org_id: null,
    owner_id: "user3"
    },
    {
      id: "4",
      type: 'file',
      name: "File 4 is shared",
      url: "https://file3.com",
      team_id: null,
      org_id: null,
      owner_id: "user3",
      // shared: [{
      //   user_id: "user1",
      //   permission: [FilePermission.can_view]
      // }]
      }
]