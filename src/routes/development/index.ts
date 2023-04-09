import { Router } from "express";
import DevelopmentController from "../../controllers/development";

const DevelopmentRouter = Router();

DevelopmentRouter.get("/", DevelopmentController.getAll);
DevelopmentRouter.post("/", DevelopmentController.create);
DevelopmentRouter.put("/:id", DevelopmentController.update);
DevelopmentRouter.delete("/:id", DevelopmentController.remove);

export default DevelopmentRouter;
