import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const developments = await req.services.development.getAll();
    send({ res, data: { developments } });
  }),
];
