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
  body("buildTime").isInt().exists(),
  body("level").isInt().exists(),
  body("cost").isArray().exists(),
  body("upkeep").isArray().exists(),
  body("improvements").isArray().exists(),
  body("datasetIds").isArray().exists(),
  body("maxPerSettlement").exists(),
  body("isUpgrade").optional(),
  body("upgradesTo").optional(),
  validationCheck,
  datasetCheck(),
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.building.createWithId(
      req.body,
      `building-${randomUUID()}`
    );
    const buildings = await req.services.building.getAll();
    send({ res, data: { buildings } });
  }),
];
