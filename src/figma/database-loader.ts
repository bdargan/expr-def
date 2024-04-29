import { FieldName, Value } from './model';
import * as data from './data'
import {Dictionary} from './apply-evaluator';
import { Item } from '../domain-models';
import { ALL_DATABASES, Database } from './data/database';


const load = <T extends Item>(db: Database<T>) => async (id: string): Promise<T | null> => {
  try {
      const item = await db.findById(id);
      if (item) {
          return item;
      } else {
          console.log(`Item with id ${id} not found`);
          return null;
      }
  } catch (error) {
      console.error('Error loading item:', error);
      throw error;
  }
};
// def get_context_path(resource, user)
//   context_path = {}.merge(resource.context_path).merge(user.context_path)
//   if context_path[:org] && context_path[:user]
//     context_path[:org_user] = [context_path[:org], context_path[:user]]
//   end
//   if context_path[:team] && context_path[:user]
//     context_path[:team_role] = [context_path[:team], context_path[:user]]
//   end
//   return context_path

export const DatabaseLoader = {
  
  async loadAll(resources: Record<FieldName, string[]>): Promise<any> { 
    console.log('loadAll', resources)//Promise<Dictionary<Dictionary<Value>>> {
    return Promise.all(Object.keys(resources).map(async (fieldName) => {
    //   load<>(fieldName as FieldName, resources[fieldName])
    console.log('loading', fieldName, resources[fieldName])
    
  }))
  // load<T>(fieldName: FieldName, id: string, value?: string[]): Promise<T|undefined> {
  //  console.log('loading data');
  //  switch (fieldName as FieldName) {
  //   case "file":
  //     return load(ALL_DATABASES.file)(id) as Promise<T|null>;
  //   case "user":
  //     return load(ALL_DATABASES.user)(id) as Promise<T|null>;
  //   default:
  //     throw new Error(`Unsupported type: ${fieldName}`);
  //  }
  // }
}

// export const load = async <T>(id: string): Promise<T|undefined> => {
//   return undefined;
// }
// const loadDocument = async (id: string): Promise<string|undefined> => {
//   return documents.first( (document) => document.id = id))
// }

// const loadFile = async (id: string): Promise<string> => {
//   return `File ${id}`;
// }

}
