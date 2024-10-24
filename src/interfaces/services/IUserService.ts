import { User } from "../../utils/types";

export interface IUserService {
  userSignUp(user: User): Promise<User>;
  userLogin(email: string, password: string): Promise<User>;
}
