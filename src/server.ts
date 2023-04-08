import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import BiomeService from "./services/biome";
import BuildingService from "./services/building";
import DevelopmentService from "./services/development";
import DistrictService from "./services/district";
import EventService from "./services/event";
import GameService from "./services/game";
import NationService from "./services/nation";
import ResourceService from "./services/resource";
import SettlementService from "./services/settlement";
import UnitService from "./services/unit";
import BiomeRouter from "./routes/biome";
import UnitRouter from "./routes/unit";
import SettlementRouter from "./routes/settlement";
import ResourceRouter from "./routes/resource";
import NationRouter from "./routes/nation";
import GameRouter from "./routes/game";
import EventRouter from "./routes/district";
import DevelopmentRouter from "./routes/development";
import BuildingRouter from "./routes/building";
import DistrictRouter from "./routes/district";
import DatasetService from "./services/dataset";
import DatasetRouter from "./routes/dataset";

export default function createServer(connect: Function) {
  dotenv.config();
  const collections = connect();
  const app = express();
  app.use(cors());

  // Performs the same task that body parser does
  app.use(express.json());

  const {
    biome,
    building,
    dataset,
    development,
    district,
    event,
    game,
    nation,
    resource,
    settlement,
    unit,
  } = collections;

  const biomeService = new BiomeService(biome);
  const buildingService = new BuildingService(building);
  const datasetService = new DatasetService(dataset);
  const developmentService = new DevelopmentService(development);
  const districtService = new DistrictService(district);
  const eventService = new EventService(event);
  const gameService = new GameService(game);
  const nationService = new NationService(nation);
  const resourceService = new ResourceService(resource);
  const settlementService = new SettlementService(settlement);
  const unitService = new UnitService(unit);

  const services = {
    biome: biomeService,
    building: buildingService,
    dataset: datasetService,
    development: developmentService,
    district: districtService,
    event: eventService,
    game: gameService,
    nation: nationService,
    resource: resourceService,
    settlement: settlementService,
    unit: unitService,
  };

  biomeService.inject(services);
  buildingService.inject(services);
  datasetService.inject(services);
  developmentService.inject(services);
  districtService.inject(services);
  eventService.inject(services);
  gameService.inject(services);
  nationService.inject(services);
  resourceService.inject(services);
  settlementService.inject(services);
  unitService.inject(services);

  app.use((req, res, next) => {
    req.services = services;
    next();
  });

  // App routes
  app.use("/biomes", BiomeRouter);
  app.use("/buildings", BuildingRouter);
  app.use("/datasets", DatasetRouter);
  app.use("/developments", DevelopmentRouter);
  app.use("/districts", DistrictRouter);
  app.use("/events", EventRouter);
  app.use("/games", GameRouter);
  app.use("/nations", NationRouter);
  app.use("/resources", ResourceRouter);
  app.use("/settlements", SettlementRouter);
  app.use("/units", UnitRouter);

  return app;
}
