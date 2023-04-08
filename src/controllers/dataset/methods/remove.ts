import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

const validation = [param("id").exists(), validationCheck];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.dataset.delete(req.params.id);
    const datasets = await req.services.dataset.getAll();
    send({ res, data: { datasets } });
  }),
];
