import { Router } from "express";

const NationRouter = Router();

NationRouter.get("/");
NationRouter.post("/");
NationRouter.put("/:id");
NationRouter.delete("/:id");

export default NationRouter;
