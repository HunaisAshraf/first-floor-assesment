import { ITaskRepository } from "../interfaces/repositories/ITaskRepositroy";
import { Task } from "../utils/types";
import TaskModel from "../models/taskModel";
import { AppError } from "../utils/appError";

export class TaskRepository implements ITaskRepository {
  async addTask(task: Task): Promise<Task> {
    try {
      const newTask = new TaskModel(task);
      await newTask.save();
      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async editTask(id: string, task: Task): Promise<Task> {
    try {
      await TaskModel.findByIdAndUpdate(id, task);
      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteTask(id: string): Promise<boolean> {
    try {
      await TaskModel.findByIdAndDelete(id);
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async assignTask(id: string, assignees: any[]): Promise<any> {
    try {
      const task = await TaskModel.findById(id);
      if (!task) {
        throw new AppError("task not found", 404);
      }
      task.assignees = [...task.assignees, ...assignees];
      await task.save();
      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getTasks(page: number): Promise<any> {
    try {
      let limit = 5;
      let skip = (page - 1) * limit;
      const tasks = await TaskModel.find().skip(skip).limit(limit);

      return tasks;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async filterTask(priority: string): Promise<any> {
    try {
      const tasks = await TaskModel.find({ priority });
      return tasks;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
