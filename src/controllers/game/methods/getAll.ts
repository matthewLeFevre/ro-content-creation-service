import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const games = await req.services.game.getAll();
    send({ res, data: { games } });
  }),
];
