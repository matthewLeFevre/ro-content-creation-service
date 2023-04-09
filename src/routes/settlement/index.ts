import { Router } from "express";
import SettlementController from "../../controllers/settlement";

const SettlementRouter = Router();

SettlementRouter.get("/", SettlementController.getAll);
SettlementRouter.post("/", SettlementController.create);
SettlementRouter.put("/:id", SettlementController.update);
SettlementRouter.delete("/:id", SettlementController.remove);

export default SettlementRouter;
