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
  body("terrainDifficulty").isInt().exists(),
  body("resources").exists(),
  body("color").exists(),
  body("backgroundSrc").exists(),
  validationCheck,
  datasetCheck(),
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.biome.createWithId(req.body, `biome-${randomUUID()}`);
    const biomes = await req.services.biome.getAll();
    send({ res, data: { biomes } });
  }),
];
