import { Router } from "express";
import EventController from "../../controllers/event";

const EventRouter = Router();

EventRouter.get("/", EventController.getAll);
EventRouter.post("/");
EventRouter.put("/:id");
EventRouter.delete("/:id");

export default EventRouter;
