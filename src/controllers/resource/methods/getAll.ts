import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const resources = await req.services.resource.getAll();
    send({ res, data: { resources } });
  }),
];
