import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";

const validation = [
  body("name").notEmpty().exists(),
  body("description").notEmpty().exists(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.dataset.createWithId(
      req.body,
      `dataset-${randomUUID()}`
    );
    const datasets = await req.services.dataset.getAll();
    send({ res, data: { datasets } });
  }),
];
