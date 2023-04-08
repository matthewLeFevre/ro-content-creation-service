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
  body("cost").exists(),
  body("upkeep").exists(),
  body("improvements").exists(),
  body("datasets").exists(),
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
