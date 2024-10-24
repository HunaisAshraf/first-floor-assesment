import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./utils/constants";
import { connectDb } from "./config/db";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
connectDb();

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
