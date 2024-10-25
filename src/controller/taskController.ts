import { Request, Response, NextFunction } from "express";
import { ITaskController } from "../interfaces/controller/ITaskController";
import { IRequestWithUser, Task } from "../utils/types";
import { ITaskService } from "../interfaces/services/ITaskService";

export class TaskController implements ITaskController {
  private taskService: ITaskService;
  constructor(taskService: ITaskService) {
    this.taskService = taskService;
  }

  async createTask(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, description, priority, dueDate } = req.body;
      const { _id } = req.user!;
      const task: Task = {
        title,
        description,
        priority,
        dueDate,
        createdBy: _id,
      };

      const newTask = await this.taskService.createTask(task);

      res
        .status(200)
        .json({ success: true, message: "task added successfull", newTask });
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
  async editTask(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const task = await this.taskService.editTask(id, req.body);

      res
        .status(200)
        .json({ success: true, message: "task edited successfull", task });
    } catch (error: any) {
      next(error);
    }
  }
  async deleteTask(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      await this.taskService.deleteTask(id);

      res
        .status(200)
        .json({ success: true, message: "task delete successfull" });
    } catch (error: any) {
      next(error);
    }
  }
  async assignTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { assignees } = req.body;

      const task = await this.taskService.assignTask(id, assignees);
      res
        .status(200)
        .json({ success: true, message: "assignees add successfull", task });
    } catch (error: any) {
      next(error);
    }
  }
  async completeTask(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { _id } = req.user!;

      const task = await this.taskService.completeTask(id, _id);
      res
        .status(200)
        .json({ success: true, message: "task complete successfull", task });
    } catch (error: any) {
      next(error);
    }
  }
  async getTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = Number(req.query.page);
      const tasks = await this.taskService.getTask(page);

      res
        .status(200)
        .json({ success: true, message: "task retreive successfull", tasks });
    } catch (error) {
      next(error);
    }
  }
  async filterTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { priority } = req.body;
      console.log(priority);
      const tasks = await this.taskService.filterTask(priority);
      res
        .status(200)
        .json({ success: true, message: "task retreive successfull", tasks });
    } catch (error: any) {
      next(error);
    }
  }
}
