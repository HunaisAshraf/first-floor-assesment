import { NextFunction, Request, Response } from "express";
import { IUserController } from "../interfaces/controller/IUserController";
import { IUserService } from "../interfaces/services/IUserService";

export class UserController implements IUserController {
  private userService: IUserService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }
  async loginContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await this.userService.userLogin(email, password);

      const { accessToken, refreshToken } = user;
      user.refreshToken = undefined;
      user.accessToken = undefined;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(200).json({
        success: true,
        message: "user login successfull",
        user,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
  async signupController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, phone, password } = req.body;
      const user = await this.userService.userSignUp({
        name,
        email,
        phone,
        password,
      });
      res
        .status(200)
        .json({ success: true, message: "user signup successfull" });
    } catch (error) {
      next(error);
    }
  }
}
