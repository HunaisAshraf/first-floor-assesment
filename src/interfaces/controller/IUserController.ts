import { NextFunction, Request, Response } from "express";

export interface IUserController {
  loginContoller(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  signupController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
