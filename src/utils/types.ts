import { Request } from "express";

export type User = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role?: "user" | "admin";
  refreshToken?: string;
  accessToken?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Task = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status?: "completed" | "incomplete";
  assignees?: string[];
  createdBy: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IRequestWithUser extends Request {
  user?: {
    _id: string;
    role: string;
    token?: string;
  };
  cookies: { [key: string]: string };
}
