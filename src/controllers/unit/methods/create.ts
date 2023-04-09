import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";
import datasetCheck from "../../../middleware/datasetCheck";

const validation = [
  body("name").exists(),
  body("description").exists(),
  body("iconSrc").exists(),
  body("datasets").exists(),
  body("cost").exists(),
  body("upkeep").exists(),
  body("meleeAttack").isInt().exists(),
  body("rangeAttack").isInt().exists(),
  body("defence").isInt().exists(),
  body("speed").isInt().exists(),
  body("requiredBuildings").exists(),
  body("trainTime").isInt().exists(),
  validationCheck,
  datasetCheck(),
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.unit.createWithId(req.body, `unit-${randomUUID()}`);
    const units = await req.services.unit.getAll();
    send({ res, data: { units } });
  }),
];
