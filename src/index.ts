import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { PORT } from "./utils/constants";
import { connectDb } from "./config/db";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
connectDb();

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});

export { io };
