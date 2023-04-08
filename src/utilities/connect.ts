import { Collection } from "@everlast-brands/local-collection";

export default function connect() {
  const biome = new Collection("biome", "./data/biome.json");
  const building = new Collection("building", "./data/building.json");
  const dataset = new Collection("dataset", "./data/dataset.json");
  const development = new Collection("development", "./data/development.json");
  const district = new Collection("district", "./data/district.json");
  const event = new Collection("event", "./data/event.json");
  const game = new Collection("game", "./data/game.json");
  const nation = new Collection("nation", "./data/nation.json");
  const resource = new Collection("resource", "./data/resource.json");
  const settlement = new Collection("settlement", "./data/settlement.json");
  const unit = new Collection("unit", "./data/unit.json");
  return {
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
  };
}
