import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";

const validation = [
  body("name").exists(),
  body("description").exists(),
  body("iconSrc").exists(),
  body("datasetIds").exists(),
  body("nationIds").isArray().exists(),
  body("size").isObject().exists(),
  body("speed").isInt().exists(),
  body("mapSrc").optional(),
  body("territories").isArray().optional(),
  body("monthTime").isInt(),
  body("yearTime").isInt(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.game.createWithId(req.body, `game-${randomUUID()}`);
    const games = await req.services.game.getAll();
    send({ res, data: { games } });
  }),
];
