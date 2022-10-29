import { Router } from "express";
import { userRouter } from "./users";
import { accessTokenRouter } from "./accessToken";

const router = Router();

router.use("/access-token", accessTokenRouter);
router.use("/user", userRouter);

export { router };
