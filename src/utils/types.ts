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
