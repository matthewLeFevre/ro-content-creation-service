import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";
import datasetCheck from "../../../middleware/datasetCheck";

const validation = [
  body("name").notEmpty().exists(),
  body("description").notEmpty().exists(),
  body("iconSrc").notEmpty().exists(),
  body("datasetIds").notEmpty().exists(),
  body("isUnique").isBoolean().exists(),
  body("value").isInt().exists(),
  validationCheck,
  datasetCheck(),
];

export default [
  ...validation,
  asyncWrapper(
    async (req: Request, res) => {
      await req.services.resource.createWithId(
        req.body,
        `resource-${randomUUID()}`
      );
      const resources = await req.services.resource.getAll();
      send({ res, data: { resources } });
    },
    { development: { sendAllErrors: true } }
  ),
];
