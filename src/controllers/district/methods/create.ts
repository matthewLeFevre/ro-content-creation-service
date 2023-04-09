import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";
import datasetCheck from "../../../middleware/datasetCheck";

const validation = [
  body("name").exists(),
  body("description").exists(),
  body("iconSrc").exists(),
  body("datasets").exists(),
  body("cost").exists(),
  body("upkeep").exists(),
  body("buildTime").isInt().exists(),
  body("productionQuantity").isInt().exists(),
  body("improvements").exists(),
  body("resourceId").exists(),
  validationCheck,
  datasetCheck(),
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    await req.services.district.createWithId(
      req.body,
      `district-${randomUUID()}`
    );
    const districts = await req.services.district.getAll();
    send({ res, data: { districts } });
  }),
];
