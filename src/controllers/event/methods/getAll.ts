import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const events = await req.services.event.getAll();
    send({ res, data: { events } });
  }),
];
