import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

const validation = [param("id").exists(), validationCheck];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.settlement.delete(req.params.id);
    const settlements = await req.services.settlement.getAll();
    send({ res, data: { settlements } });
  }),
];
