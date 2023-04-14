import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";
import datasetCheck from "../../../middleware/datasetCheck";

const validation = [
  body("name").exists(),
  body("description").exists(),
  body("spriteSheetSrc").exists(),
  body("datasetIds").exists(),
  body("prosperity").isInt().exists(),
  body("location").exists(),
  body("unitId").exists(),
  body("resourceId").exists(),
  validationCheck,
  datasetCheck(),
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.development.createWithId(
      req.body,
      `development-${randomUUID()}`
    );
    const developments = await req.services.development.getAll();
    send({ res, data: { developments } });
  }),
];
