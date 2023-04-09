import { Router } from "express";

const EventRouter = Router();

EventRouter.get("/");
EventRouter.post("/");
EventRouter.put("/:id");
EventRouter.delete("/:id");

export default EventRouter;
