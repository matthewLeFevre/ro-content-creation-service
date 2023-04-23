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
  body("datasetIds").isArray({ min: 1 }).optional(),
  body("terrainDifficulty").isInt().optional(),
  body("resourceIds").optional(),
  body("color").optional(),
  body("backgroundSrc").optional,
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const biome = await req.services.biome.get(req.params.id);
    const updatedBiome = update(req.body, biome);
    await req.services.biome.update(biome.id, updatedBiome);
    const biomes = await req.services.biome.getAll();
    send({ res, data: { biomes } });
  }),
];
