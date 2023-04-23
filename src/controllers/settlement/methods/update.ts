import { body, param } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import update from "../../../utilities/update";

const validation = [
  param("id").exists(),
  body("name").optional(),
  body("description").optional(),
  body("spriteSheetSrc").optional(),
  body("datasetIds").optional(),
  body("location").optional(),
  body("developmentIds").optional(),
  body("startingBuildingIds").optional(),
  body("startingGarrison").optional(),
  body("startingDistricts").optional(),
  body("nationId").optional(),
  body("startingPopulation").isInt().optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const settlement = await req.services.settlement.get(req.params.id);
    const updatedSettlement = update(req.body, settlement);
    await req.services.settlement.update(settlement.id, updatedSettlement);
    const settlements = await req.services.settlement.getAll();
    send({ res, data: { settlements } });
  }),
];
