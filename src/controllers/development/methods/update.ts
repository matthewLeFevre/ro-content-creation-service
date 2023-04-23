import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import update from "../../../utilities/update";

const validation = [
  param("id").exists(),
  body("name").optional(),
  body("description").optional(),
  body("spriteSheetSrc").optional(),
  body("datasetIds").optional(),
  body("prosperity").isInt().optional(),
  body("location").optional(),
  body("unitId").optional(),
  body("resourceId").optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const development = await req.services.development.get(req.params.id);
    const updatedDevelopment = update(req.body, development);
    await req.services.development.update(development.id, updatedDevelopment);
    const developments = await req.services.development.getAll();
    send({ res, data: { developments } });
  }),
];
