import { Router } from "express";
import BiomeController from "../../controllers/biome";

const BiomeRouter = Router();

BiomeRouter.get("/", BiomeController.getAll);
BiomeRouter.post("/", BiomeController.create);
BiomeRouter.put("/:id", BiomeController.update);
BiomeRouter.delete("/:id", BiomeController.remove);

export default BiomeRouter;
