import { IUserRepository } from "../interfaces/repositories/IuserRepository";
import { IUserService } from "../interfaces/services/IUserService";
import { AppError } from "../utils/appError";
import { comparePassword, encryptPassword } from "../utils/encryption";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken";
import { User } from "../utils/types";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async userSignUp(user: User): Promise<User> {
    try {
      const userExist = await this.userRepository.getUserByEmail(user.email);

      if (userExist) {
        throw new AppError("user already exist", 409);
      }

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

      if (!passwordMatch) {
        throw new AppError("invalid password", 401);
      }

      const payload = {
        _id: user._id,
        role: user.role,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      const updateUser = JSON.parse(JSON.stringify(user));
      await this.userRepository.updateUser(user._id!, {
        ...updateUser,
        refreshToken,
      });

      return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        refreshToken,
        accessToken,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
