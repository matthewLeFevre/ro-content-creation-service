import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

const validation = [
  body("name").exists(),
  body("description").exists(),
  body("iconSrc").exists(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const buildings = await req.services.building.getAll();
    send({ res, data: { buildings } });
  }),
];
