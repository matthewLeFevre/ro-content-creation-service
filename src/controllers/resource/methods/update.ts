import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import update from "../../../utilities/update";

const validation = [
  param("id").exists(),
  body("name").notEmpty().optional(),
  body("description").notEmpty().optional(),
  body("iconSrc").notEmpty().optional(),
  body("datasetIds").notEmpty().optional(),
  body("isUnique").isBoolean().optional(),
  body("value").isInt().optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(
    async (req: Request, res) => {
      const resource = await req.services.resource.get(req.params.id);
      const updatedResource = update(req.body, resource);
      await req.services.resource.update(resource.id, updatedResource);
      const resources = await req.services.resource.getAll();
      send({ res, data: { resources } });
    },
    {
      development: {
        sendAllErrors: true,
      },
    }
  ),
];
