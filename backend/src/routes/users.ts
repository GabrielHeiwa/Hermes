import { Router } from "express";
import { UserController } from "../controllers/users";

const userController = new UserController();
const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.post("/me", userController.me);

export { userRouter };
