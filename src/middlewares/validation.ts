import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { AppError } from "../utils/appError";

export const signupValitor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError("name is required", 404);
    }

    if (!email || !validator.isEmail(email)) {
      throw new AppError("invalid email", 404);
    }

    if (password.length < 6) {
      throw new AppError("passowrd must be atleast 6 character", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
      throw new AppError("invalid email", 400);
    }

    if (!password) {
      throw new AppError("invalid password", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const taskValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || !validator.isAlphanumeric(title)) {
      throw new AppError("invalid title", 400);
    }

    if (!description) {
      throw new AppError("invalid description", 400);
    }

    const piorities = ["low", "medium", "high"];
    if (!priority || !piorities.includes(priority)) {
      throw new AppError("invalid description", 400);
    }
    if (!dueDate) {
      throw new AppError("invalid dueDate", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
