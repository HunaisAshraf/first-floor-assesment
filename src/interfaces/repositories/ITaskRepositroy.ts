import { Task } from "../../utils/types";

export interface ITaskRepository {
  addTask(task: Task): Promise<Task>;
  editTask(id: string, task: any): Promise<Task>;
  deleteTask(id: string): Promise<boolean>;
  assignTask(id: string, assignees: any[]): Promise<any>;
}
