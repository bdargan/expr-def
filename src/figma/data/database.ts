import { Item } from "../../domain-models";

import { UserDatabase } from "./user-database";
import { FileDatabase } from './file-database';
export interface Database<T extends Item> {
  save(item: T): Promise<void>;
  findById(id: string): Promise<T | null>;
}

export const ALL_DATABASES = {
  user: new UserDatabase(),
  file: new FileDatabase()
}