import mongoose from "mongoose";
import { MONGO_URI } from "../utils/constants";

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
