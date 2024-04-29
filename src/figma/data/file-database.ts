import { File } from "../../domain-models";
import { Database } from "./database";
import {files} from './file';
export class FileDatabase implements Database<File> {
  private files: File[] = files ?? [];

  async save(file: File): Promise<void> {
      this.files = [...this.files, file];
  }

  async findById(id: string): Promise<File | null> {
      return this.files.find(file => file.id === id) || null;
  }
}
