import { IUserRepository } from "../interfaces/repositories/IuserRepository";
import { AppError } from "../utils/appError";
import { User } from "../utils/types";
import UserModel from "../models/userModel";

export class UserRepository implements IUserRepository {
  async addUser(user: User): Promise<User> {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      return { name: user.name, email: user.email, phone: user.phone };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new AppError("user not found", 404);
      }

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
