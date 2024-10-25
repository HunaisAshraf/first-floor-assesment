import { Task } from "../../utils/types";

export interface ITaskService {
  createTask(user: Task): Promise<Task>;
  editTask(id: string, task: Task): Promise<Task>;
  deleteTask(id: string): Promise<boolean>;
  assignTask(id: string, assignees: string[]): Promise<Task>;
  completeTask(id: string, userId: string): Promise<Task>;
  getTask(page: number): Promise<any>;
  filterTask(priority: string): Promise<Task[]>;
}
