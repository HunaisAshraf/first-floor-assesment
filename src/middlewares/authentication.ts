import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { REFRESH_TOKEN_SECRET } from "../utils/constants";
import { UserRepository } from "../repositories/userRepository";
import { generateAccessToken } from "../utils/jwtToken";
import { IRequestWithUser } from "../utils/types";

export const validateRefreshToken = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw new AppError("refreshtoken not found", 404);
    }
    jwt.verify(token, REFRESH_TOKEN_SECRET, async (err: any, decode: any) => {
      if (err) {
        throw new AppError("token expired", 401);
      }

      const repository = new UserRepository();
      const user = await repository.getUserById(decode._id);
      console.log(user);

      if (user.refreshToken !== token) {
        throw new AppError("token invalid", 40);
      }
      const accessToken = generateAccessToken({
        _id: user._id,
        role: user.role,
      });
      res.status(200).json({ success: true, accessToken });
    });
  } catch (error) {
    next(error);
  }
};
