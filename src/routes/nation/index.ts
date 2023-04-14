import { Router } from "express";
import NationController from "../../controllers/nation";

const NationRouter = Router();

NationRouter.get("/", NationController.getAll);
NationRouter.post("/", NationController.create);
NationRouter.put("/:id", NationController.update);
NationRouter.delete("/:id", NationController.remove);

export default NationRouter;
