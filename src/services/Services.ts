import BiomeService from "./biome";
import BuildingService from "./building";
import DatasetService from "./dataset";
import DevelopmentService from "./development";
import DistrictService from "./district";
import EventService from "./event";
import GameService from "./game";
import NationService from "./nation";
import ResourceService from "./resource";
import SettlementService from "./settlement";
import UnitService from "./unit";

export default interface Services {
  biome: BiomeService;
  building: BuildingService;
  development: DevelopmentService;
  district: DistrictService;
  event: EventService;
  game: GameService;
  nation: NationService;
  resource: ResourceService;
  settlement: SettlementService;
  unit: UnitService;
  dataset: DatasetService;
}
