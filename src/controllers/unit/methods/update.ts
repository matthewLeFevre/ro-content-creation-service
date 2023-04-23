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
  body("datasetIds").optional(),
  body("cost").optional(),
  body("upkeep").optional(),
  body("meleeAttack").isInt().optional(),
  body("rangeAttack").isInt().optional(),
  body("defence").isInt().optional(),
  body("speed").isInt().optional(),
  body("requiredBuildingIds").optional(),
  body("trainTime").isInt().optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const unit = await req.services.unit.get(req.params.id);
    const updatedUnit = update(req.body, unit);
    await req.services.unit.update(unit.id, updatedUnit);
    const units = await req.services.unit.getAll();
    send({ res, data: { units } });
  }),
];
