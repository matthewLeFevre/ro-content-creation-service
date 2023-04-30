import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import update from "../../../utilities/update";

const validation = [
  param("id").exists(),
  body("name").optional(),
  body("description").optional(),
  body("iconSrc").optional(),
  body("buildTime").isInt().optional(),
  body("level").isInt().optional(),
  body("cost").isArray().optional(),
  body("upkeep").isArray().optional(),
  body("improvements").isArray().optional(),
  body("datasetIds").isArray().optional(),
  body("upgradesTo").optional(),
  body("isUpgrade").optional(),
  body("maxPerSettlement").optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const building = await req.services.building.get(req.params.id);
    const updatedBuilding = update(req.body, building);
    await req.services.building.update(building.id, updatedBuilding);
    const buildings = await req.services.building.getAll();
    send({ res, data: { buildings } });
  }),
];
