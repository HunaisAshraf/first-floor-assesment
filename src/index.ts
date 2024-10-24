import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./utils/constants";
import { connectDb } from "./config/db";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
connectDb();

app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
