import { Router } from "express";
import BuildingController from "../../controllers/building";

const BuildingRouter = Router();

BuildingRouter.get("/", BuildingController.getAll);
BuildingRouter.post("/", BuildingController.create);
BuildingRouter.put("/:id", BuildingController.update);
BuildingRouter.delete("/:id", BuildingController.remove);

export default BuildingRouter;
