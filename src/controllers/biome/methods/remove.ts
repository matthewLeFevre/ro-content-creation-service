import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

const validation = [param("id").exists(), validationCheck];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.biome.delete(req.params.id);
    const biomes = await req.services.biome.getAll();
    send({ res, data: { biomes } });
  }),
];
