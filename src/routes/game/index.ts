import { Router } from "express";

const GameRouter = Router();

GameRouter.get("/");
GameRouter.post("/");
GameRouter.put("/:id");
GameRouter.delete("/:id");

export default GameRouter;
