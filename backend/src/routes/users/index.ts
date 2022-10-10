import { Router } from "express";
import { UserController } from "../../controllers/user";

const userController = new UserController();
const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

userRouter.post("/bcrypt/login", userController.loginBcrypt);
userRouter.post("/bcrypt/register", userController.registerBcrypt);

export { userRouter };
