export type User = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  role?: "user" | "admin";
  refreshToken?: string;
  createdAt?: string;
  updatedAt?: string;
};
