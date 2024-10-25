import express from "express";
import { isAdmin } from "../middlewares/authorisation";
import { taskValidator } from "../middlewares/validation";
import { TaskController } from "../controller/taskController";
import { TaskService } from "../services/taskService";
import { TaskRepository } from "../repositories/taskRepository";
const router = express.Router();

const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

router
  .route("/create")
  .post(isAdmin, taskValidator, controller.createTask.bind(controller));
router
  .route("/edit/:id")
  .put(isAdmin, taskValidator, controller.editTask.bind(controller));
router
  .route("/delete/:id")
  .delete(isAdmin, controller.deleteTask.bind(controller));
router
  .route("/assign/:id")
  .put(isAdmin, controller.assignTask.bind(controller));
router
  .route("/complete/:id")
  .put(isAdmin, controller.completeTask.bind(controller));

export default router;
