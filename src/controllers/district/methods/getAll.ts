import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const districts = await req.services.district.getAll();
    send({ res, data: { districts } });
  }),
];
