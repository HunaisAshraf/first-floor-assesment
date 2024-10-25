import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils/constants";
import { IRequestWithUser } from "../utils/types";

export const isAdmin = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError("accesstoken is required", 404);
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decode: any) => {
      if (err) {
        throw new AppError("token expired", 401);
      }
      if (decode.role !== "admin") {
        throw new AppError("not authorised", 401);
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const isLogin = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError("accesstoken is required", 404);
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decode: any) => {
      if (err) {
        throw new AppError("token expired", 401);
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
