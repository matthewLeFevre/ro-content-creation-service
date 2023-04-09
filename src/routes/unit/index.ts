import { Router } from "express";
import UnitController from "../../controllers/unit";

const UnitRouter = Router();

UnitRouter.get("/", UnitController.getAll);
UnitRouter.post("/", UnitController.create);
UnitRouter.put("/:id", UnitController.update);
UnitRouter.delete("/:id", UnitController.remove);

export default UnitRouter;
