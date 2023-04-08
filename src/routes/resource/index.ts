import { Router } from "express";
import ResourceController from "../../controllers/resource";

const ResourceRouter = Router();

ResourceRouter.get("/", ResourceController.getAll);
ResourceRouter.post("/", ResourceController.create);
ResourceRouter.put("/:id", ResourceController.update);
ResourceRouter.delete("/:id", ResourceController.remove);

export default ResourceRouter;
