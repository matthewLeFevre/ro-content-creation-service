import { body } from "express-validator";
import validationCheck from "../../../middleware/validationCheck";
import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { randomUUID } from "crypto";
import datasetCheck from "../../../middleware/datasetCheck";

export default [
  asyncWrapper(async (req: Request, res) => {
    await req.services.profile.createWithId(
      req.body,
      `profile-${randomUUID()}`
    );
    const profiles = await req.services.profile.getAll();
    send({ res, data: { profiles } });
  }),
];
