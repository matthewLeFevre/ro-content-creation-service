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
  body("trainableUnits").exists(),
  body("buildableBuildings").exists(),
  body("color").exists(),
  body("playable").isBoolean().exists(),
  body("startingCameraLocation").exists(),
  body("profileId").exists(),
  validationCheck,
  datasetCheck(),
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.nation.createWithId(req.body, `nation-${randomUUID()}`);
    const nations = await req.services.nation.getAll();
    send({ res, data: { nations } });
  }),
];
