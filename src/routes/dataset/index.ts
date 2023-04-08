import { Router } from "express";
import DatasetController from "../../controllers/dataset";

const DatasetRouter = Router();

DatasetRouter.get("/", DatasetController.getAll);
DatasetRouter.post("/", DatasetController.create);
DatasetRouter.put("/:id", DatasetController.update);
DatasetRouter.delete("/:id", DatasetController.remove);

export default DatasetRouter;
