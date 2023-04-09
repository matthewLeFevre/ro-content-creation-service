import { Router } from "express";
import DistrictController from "../../controllers/district";

const DistrictRouter = Router();

DistrictRouter.get("/", DistrictController.getAll);
DistrictRouter.post("/", DistrictController.create);
DistrictRouter.put("/:id", DistrictController.update);
DistrictRouter.delete("/:id", DistrictController.remove);

export default DistrictRouter;
