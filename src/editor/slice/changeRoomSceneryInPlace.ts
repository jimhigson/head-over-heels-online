import { type SceneryName, sceneryNames } from "../../sprites/planets";
import type { EditorRoomJson } from "../EditorRoomId";
import { rotatingSceneryTiles } from "./createStarterRoom";

export const changeRoomSceneryInPlace = (
  roomJson: EditorRoomJson,
  sceneryName: SceneryName,
) => {
  roomJson.planet = sceneryName;

  if ((sceneryNames as string[]).includes(roomJson.floor)) {
    roomJson.floor = sceneryName;
  }

  // reset the walls to tiles that are allowed in this scenery:
  for (const i of Object.values(roomJson.items)) {
    if (i.type === "wall") {
      if (i.config.direction === "away" || i.config.direction === "left") {
        i.config.tiles = rotatingSceneryTiles(
          sceneryName,
          i.config.tiles.length,
        );
      }
    }
  }
};
