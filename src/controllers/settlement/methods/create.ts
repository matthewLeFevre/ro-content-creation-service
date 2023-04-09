import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";
import datasetCheck from "../../../middleware/datasetCheck";

const validation = [
  body("name").exists(),
  body("description").exists(),
  body("spriteSheetSrc").exists(),
  body("datasets").exists(),
  body("location").exists(),
  body("villages").exists(),
  body("startingBuildings").exists(),
  body("startingGarrison").exists(),
  body("startingDistricts").exists(),
  body("nationId").exists(),
  body("startingPopulation").isInt().exists(),
  validationCheck,
  datasetCheck(),
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.settlement.createWithId(
      req.body,
      `settlement-${randomUUID()}`
    );
    const settlements = await req.services.settlement.getAll();
    send({ res, data: { settlements } });
  }),
];
