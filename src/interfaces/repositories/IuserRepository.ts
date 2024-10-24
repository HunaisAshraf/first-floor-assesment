import { User } from "../../utils/types";

export interface IUserRepository {
  addUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  updateUser(id: string, user: User): Promise<User>;
}
