import Service from "../../utilities/service";
import create from "./methods/create";
import getAll from "./methods/getAll";
import remove from "./methods/remove";
import update from "./methods/update";

const ResourceController = {
  create,
  update,
  remove,
  getAll,
};

export default ResourceController;
