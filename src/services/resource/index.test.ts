import connect from "../../utilities/connect";
import { it, expect } from "vitest";
import { randomUUID } from "crypto";
import ResourceService from ".";
const { resource } = connect();
const service = new ResourceService(resource);

let resourceId = `resource-${randomUUID()}`;

it("creates new resource", async () => {
  await service.createWithId(
    {
      name: "Food",
      description:
        "Any nutritious substance that people or animals eat or drink.",
      iconSrc:
        "https://firebasestorage.googleapis.com/v0/b/regal-order-ef849.appspot.com/o/food.png?alt=media&token=fdefe39a-50a0-4f96-b5b2-b7401b7fd76d",
    },
    resourceId
  );
  const resource = await service.get(resourceId);
  expect(resource).toBeTruthy();
});
it("updates resource", async () => {
  await service.update(resourceId, { name: "Wood" });
  const resource = await service.get(resourceId);
  expect(resource.name).toBe("Wood");
});
it("deletes resource", async () => {
  await service.delete(resourceId);
  const resource = await service.get(resourceId);
  expect(resource).toBeFalsy();
});
