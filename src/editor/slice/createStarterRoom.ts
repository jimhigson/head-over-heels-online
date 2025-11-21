import type { JsonItem } from "../../model/json/JsonItem";
import type { Xy } from "../../utils/vectors/vectors";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
  EditorRoomJsonItems,
} from "../editorTypes";

import { rotatingSceneryTiles } from "./rotatingSceneryTiles";

const starterRoomWallItems = (size: Xy): EditorRoomJsonItems => ({
  ["awayWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "away",
      tiles: Array.from(rotatingSceneryTiles("blacktooth", size.x)),
    },
    position: { x: 0, y: size.y, z: 0 },
  } satisfies JsonItem<"wall", EditorRoomId, EditorRoomItemId, "blacktooth">,
  ["leftWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "left",
      tiles: Array.from(rotatingSceneryTiles("blacktooth", size.y)),
    },
    position: { x: size.x, y: 0, z: 0 },
  },
  ["towardsWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "towards",
      times: { x: size.x },
    },
    position: { x: 0, y: 0, z: 0 },
  },
  ["rightWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "right",
      times: { y: size.y },
    },
    position: { x: 0, y: 0, z: 0 },
  },
});

/**
 * the room that you start from when you create a room in the editor
 */
export const starterRoom = (size: Xy): Omit<EditorRoomJson, "id"> => ({
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    ["floor" as EditorRoomItemId]: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: size,
      },
      position: { x: 0, y: 0, z: 0 },
    },
    ...starterRoomWallItems(size),
  },
});
