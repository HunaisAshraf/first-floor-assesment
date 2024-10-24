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

      res.status(200).json({ success: true, user });
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
      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }
}
