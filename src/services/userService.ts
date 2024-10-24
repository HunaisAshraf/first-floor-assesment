import { IUserRepository } from "../interfaces/repositories/IuserRepository";
import { IUserService } from "../interfaces/services/IUserService";
import { AppError } from "../utils/appError";
import { comparePassword, encryptPassword } from "../utils/encryption";
import { User } from "../utils/types";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async userSignUp(user: User): Promise<User> {
    try {
      const hashedPassword = encryptPassword(user.password!);

      const newUser = await this.userRepository.addUser({
        ...user,
        password: hashedPassword,
      });

      return { name: newUser.name, email: newUser.email, phone: newUser.phone };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async userLogin(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      const passwordMatch = comparePassword(password, user.password!);
      console.log(user, passwordMatch);

      if (!passwordMatch) {
        throw new AppError("invalid password", 401);
      }

      return { name: user.name, email: user.email, phone: user.phone };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
