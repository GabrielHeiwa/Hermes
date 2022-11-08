import { Router } from "express";
import { MessengerController } from "../controllers/messenger";

const messengerController = new MessengerController();
const messengerRouter = Router();

messengerRouter.post("/create", messengerController.create);
messengerRouter.post("/start/:messengerId", messengerController.start);
messengerRouter.post("/stop/:messengerId", messengerController.stop);
messengerRouter.delete("/remove/:messengerId", messengerController.remove);
messengerRouter.put("/edit", messengerController.edit);

export { messengerRouter };
