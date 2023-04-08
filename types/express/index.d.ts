import Services from "../../src/services/Services";
import BiomeService from "../../src/services/biome";
import BuildingService from "../../src/services/building";
import DevelopmentService from "../../src/services/development";
import DistrictService from "../../src/services/district";
import EventService from "../../src/services/event";
import GameService from "../../src/services/game";
import NationService from "../../src/services/nation";
import ResourceService from "../../src/services/resource";
import SettlementService from "../../src/services/settlement";
import UnitService from "../../src/services/unit";

declare global {
  namespace Express {
    interface Request {
      services: Services;
    }
  }
}
