import express from "express";
import { UserController } from "../controller/userController";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { loginValidator, signupValitor } from "../middlewares/validation";
const router = express.Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router
  .route("/login")
  .post(loginValidator, controller.loginContoller.bind(controller));
router
  .route("/signup")
  .post(signupValitor, controller.signupController.bind(controller));

export default router;
