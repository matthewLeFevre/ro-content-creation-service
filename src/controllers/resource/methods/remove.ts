import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

const validation = [param("id").exists(), validationCheck];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    console.log(req.params.id);
    await req.services.resource.delete(req.params.id);
    const resources = await req.services.resource.getAll();
    send({ res, data: { resources } });
  }),
];
