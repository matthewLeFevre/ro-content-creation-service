import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const buildings = await req.services.building.getAll();
    console.log(buildings);
    send({ res, data: { buildings } });
  }),
];
