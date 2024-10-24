import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string): string {
  if (!process.env[key]) {
    throw new Error(`${key} is not found`);
  }
  return process.env[key];
}

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = getEnv("MONGO_URI");
export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");
