import {
  type PlanetName,
  planets,
  type SceneryName,
} from "../../sprites/planets";
import { type RoomJson, roomJsonItemsIterable } from "../RoomJson";
import { rotatingSceneryTiles } from "./rotatingSceneryTiles";

export const changeRoomSceneryInPlace = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<RoomId, RoomItemId>,
  sceneryName: SceneryName,
) => {
  roomJson.planet = sceneryName;

  for (const i of roomJsonItemsIterable(roomJson)) {
    if (i.type === "floor" && i.config.floorType === "standable") {
      i.config.scenery = sceneryName;
    }

    if (i.type === "wall") {
      i.config.tiles = Array.from(
        rotatingSceneryTiles(sceneryName, i.config.tiles.length),
      );
    }

    if (i.type === "pickup" && i.config.gives === "crown") {
      if ((planets as Readonly<SceneryName[]>).includes(sceneryName)) {
        i.config.planet = sceneryName as PlanetName;
      }
    }
  }
};
