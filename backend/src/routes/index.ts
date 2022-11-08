import { Router } from "express";
import { userRouter } from "./users";
import { accessTokenRouter } from "./accessToken";
import { messengerRouter } from "./messenger";

const router = Router();

router.use("/access-token", accessTokenRouter);
router.use("/user", userRouter);
router.use("/messenger", messengerRouter);

export { router };
