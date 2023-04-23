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
  body("cost").optional(),
  body("upkeep").optional(),
  body("buildTime").isInt().optional(),
  body("productionQuantity").isInt().optional(),
  body("improvements").optional(),
  body("resourceId").optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const district = await req.services.district.get(req.params.id);
    const updatedDistrict = update(req.body, district);
    await req.services.district.update(district.id, updatedDistrict);
    const districts = await req.services.district.getAll();
    send({ res, data: { districts } });
  }),
];
