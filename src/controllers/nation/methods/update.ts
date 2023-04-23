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
  body("trainableUnitIds").optional(),
  body("buildableBuildingIds").optional(),
  body("color").optional(),
  body("playable").isBoolean().optional(),
  body("startingCameraLocation").optional(),
  body("profileId").optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const nation = await req.services.nation.get(req.params.id);
    const updatedNation = update(req.body, nation);
    await req.services.nation.update(nation.id, updatedNation);
    const nations = await req.services.nation.getAll();
    send({ res, data: { nations } });
  }),
];
