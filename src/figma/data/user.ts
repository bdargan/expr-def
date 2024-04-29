import { User } from "../../domain-models";

export const user: User[] = [
  {
    id: 'alice',
    type: 'user',
    email: 'alice@gmail.com',
    team_id: null
  },
  {
    id: '2',
    type: 'user',    
    email: 'bob@google.com',
    team_id: 'team2',
  },
  {
    id: '3',
    type: 'user',    
    email: 'g@google.com',
    team_id: null
  }
    
]