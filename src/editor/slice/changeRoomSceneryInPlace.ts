import type { PlanetName } from "../../sprites/planets";
import { planets, type SceneryName } from "../../sprites/planets";
import type { EditorRoomJson } from "../EditorRoomId";
import { rotatingSceneryTiles } from "./createStarterRoom";

export const changeRoomSceneryInPlace = (
  roomJson: EditorRoomJson,
  sceneryName: SceneryName,
) => {
  roomJson.planet = sceneryName;

  // reset the walls to tiles that are allowed in this scenery:
  for (const i of Object.values(roomJson.items)) {
    if (i.type === "floor" && i.config.floorType === "standable") {
      i.config.scenery = sceneryName;
    }

    if (i.type === "wall") {
      if (i.config.direction === "away" || i.config.direction === "left") {
        i.config.tiles = rotatingSceneryTiles(
          sceneryName,
          i.config.tiles.length,
        );
      }
    }

    if (i.type === "pickup" && i.config.gives === "crown") {
      if ((planets as Readonly<SceneryName[]>).includes(sceneryName)) {
        i.config.planet = sceneryName as PlanetName;
      }
    }
  }
};
