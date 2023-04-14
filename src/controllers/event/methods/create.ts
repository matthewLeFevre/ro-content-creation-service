import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";

const validation = [
  body("name").exists(),
  body("description").exists(),
  body("iconSrc").exists(),
  body("dataSetIds").exists(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.resource.createWithId(
      req.body,
      `resource-${randomUUID}`
    );
    const resources = await req.services.resource.getAll();
    send({ res, data: { resources } });
  }),
];
