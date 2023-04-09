import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const settlements = await req.services.settlement.getAll();
    send({ res, data: { settlements } });
  }),
];
