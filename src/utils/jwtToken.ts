import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constants";

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};

export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
