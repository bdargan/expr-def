import { User } from "../../domain-models";
import { Database } from "./database";
export class UserDatabase implements Database<User> {
  private users: User[] = [];

  async save(user: User): Promise<void> {
      this.users = [...this.users, user];
  }

  async findById(id: string): Promise<User | null> {
      return this.users.find(user => user.id === id) || null;
  }
}
