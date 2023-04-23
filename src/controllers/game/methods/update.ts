import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import update from "../../../utilities/update";

const validation = [
  param("id").exists(),
  body("name").optional(),
  body("description").optional(),
  body("iconSrc").optional(),
  body("datasetIds").optional(),
  body("nationIds").isArray().optional(),
  body("size").isObject().optional(),
  body("speed").isInt().optional(),
  body("mapSrc").optional(),
  body("territories").isArray().optional(),
  body("monthTime").isInt(),
  body("yearTime").isInt(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const game = await req.services.game.get(req.params.id);
    const updatedGame = update(req.body, game);
    await req.services.game.update(game.id, updatedGame);
    const games = await req.services.game.getAll();
    send({ res, data: { games } });
  }),
];
