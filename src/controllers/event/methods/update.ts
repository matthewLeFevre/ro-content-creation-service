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
  body("dataSetIds").optional(),
  validationCheck,
];

export default [
  ...validation,
  asyncWrapper(async (req: Request, res) => {
    const event = await req.services.event.get(req.params.id);
    const updatedEvent = update(req.body, event);
    await req.services.event.update(event.id, updatedEvent);
    const events = await req.services.event.getAll();
    send({ res, data: { events } });
  }),
];
