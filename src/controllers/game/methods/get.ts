import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";

export default [
  asyncWrapper(async (req: Request, res) => {
    const game = await req.services.game.get(req.params.id);
    const [
      allNations,
      allBuildings,
      allUnits,
      allResources,
      allSettlements,
      allDevelopments,
      allBiomes,
      allDistricts,
      allEvents,
      allProfiles,
    ] = await Promise.all([
      req.services.nation.getAll(),
      req.services.building.getAll(),
      req.services.unit.getAll(),
      req.services.settlement.getAll(),
      req.services.development.getAll(),
      req.services.biome.getAll(),
      req.services.district.getAll(),
      req.services.event.getAll(),
      req.services.event.getAll(),
      req.services.profile.getAll(),
    ]);

    function filterDataset(i) {
      return i.datasetIds.includes(game.datasetIds[0]);
    }
    send({
      res,
      data: {
        game,
        nations: allNations.filter(filterDataset),
        buildings: allBuildings.filter(filterDataset),
        units: allUnits.filter(filterDataset),
        settlements: allSettlements.filter(filterDataset),
        developments: allDevelopments.filter(filterDataset),
        biomes: allBiomes.filter(filterDataset),
        districts: allDistricts.filter(filterDataset),
        events: allEvents.filter(filterDataset),
        profiles: allProfiles.filter(filterDataset),
        resources: allResources.filter(filterDataset),
      },
    });
  }),
];
