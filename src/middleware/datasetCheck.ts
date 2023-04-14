import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default function datasetCheck() {
  return asyncWrapper(
    async (req: Request, res, next) => {
      const datasetIds = req.body.datasetIds;
      if (datasetIds.length < 1)
        return send({
          res,
          message: "No dataset assigned, must have at least one dataset.",
          status: 400,
        });
      const datasets = await Promise.all(
        datasetIds.map(id => req.services.dataset.get(id))
      );
      console.log(datasets);
      if (!datasets.every(ds => ds))
        return send({
          res,
          message: "Invalid dataset.",
          status: 400,
        });
      next();
    },
    { development: { sendAllErrors: true } }
  );
}
