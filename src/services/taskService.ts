import { ITaskRepository } from "../interfaces/repositories/ITaskRepositroy";
import { ITaskService } from "../interfaces/services/ITaskService";
import { Task } from "../utils/types";

export class TaskService implements ITaskService {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(task: Task): Promise<Task> {
    try {
      const newTask = await this.taskRepository.addTask(task);
      return newTask;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async editTask(id: string, task: Task): Promise<Task> {
    try {
      const editedTask = await this.taskRepository.editTask(id, task);
      return editedTask;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteTask(id: string): Promise<boolean> {
    try {
      await this.taskRepository.deleteTask(id);
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async assignTask(id: string, assignees: string[]): Promise<Task> {
    try {
      const task = await this.taskRepository.assignTask(id, assignees);
      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async completeTask(id: string, userId: string): Promise<Task> {
    try {
      console.log("kdsjfkjsf");
      const task = await this.taskRepository.editTask(id, {
        status: "completed",
        updateBy: userId,
      });
      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
