import { Router } from "express";
import GameController from "../../controllers/game";

const GameRouter = Router();

GameRouter.get("/", GameController.getAll);
GameRouter.get("/:id", GameController.get);
GameRouter.post("/", GameController.create);
GameRouter.put("/:id", GameController.update);
GameRouter.delete("/:id", GameController.remove);

export default GameRouter;
