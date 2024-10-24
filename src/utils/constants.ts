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
