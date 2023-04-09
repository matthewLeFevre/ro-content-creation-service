import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const nations = await req.services.nation.getAll();
    send({ res, data: { nations } });
  }),
];
