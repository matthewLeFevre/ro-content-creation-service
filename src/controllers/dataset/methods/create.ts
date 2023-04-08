import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";

const validation = [
  body("name").exists(),
  body("description").exists(),
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
