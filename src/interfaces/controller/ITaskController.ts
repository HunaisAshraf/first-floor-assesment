import { NextFunction, Request, Response } from "express";

export interface ITaskController {
  createTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  editTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  assignTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  completeTask(req: Request, res: Response, next: NextFunction): Promise<void>;
}
