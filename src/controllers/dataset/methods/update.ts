import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import update from "../../../utilities/update";

const validation = [
  param("id").exists(),
  body("name").optional(),
  body("description").optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const dataset = await req.services.dataset.get(req.params.id);
    const updatedDataset = update(req.body, dataset);
    await req.services.dataset.update(dataset.id, updatedDataset);
    const datasets = await req.services.dataset.getAll();
    send({ res, data: { datasets } });
  }),
];
