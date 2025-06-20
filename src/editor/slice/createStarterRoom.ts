import { cycle, take } from "iter-tools";
import type { JsonItem } from "../../model/json/JsonItem";
import { type SceneryName, type Wall } from "../../sprites/planets";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
  EditorRoomJsonItems,
} from "../EditorRoomId";

/**
 * some standard wall patterns that can be repeated for creating the wall tiles
 * in all of the sceneries, using all the tiles and being symmetrical in an 8x8 room
 */
const wallStarterPatterns: { [ScN in SceneryName]: Array<Wall<ScN>> } = {
  jail: ["bars"],
  blacktooth: ["plain", "plain", "armour", "shield", "shield", "armour"],
  bookworld: ["book", "book", "cowboy"],
  egyptus: [
    "hieroglyphics",
    "hieroglyphics",
    "hieroglyphics",
    "sarcophagus",
    "sarcophagus",
  ],
  market: ["passage", "more-fruits", "more-fruits", "more-fruits", "fruits"],
  moonbase: ["coil", "window1", "window2", "window3"],
  penitentiary: ["loop", "loop", "skeleton"],
  safari: ["wall", "shield", "wall", "window", "window", "wall", "shield"],
};

export const rotatingSceneryTiles = <S extends SceneryName>(
  sceneryName: S,
  size: number,
): Wall<S>[] => {
  return [...take(size, cycle(wallStarterPatterns[sceneryName]))];
};

const starterRoomWallItems: EditorRoomJsonItems = {
  ["awayWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "away",
      times: { x: 8 },
      tiles: rotatingSceneryTiles("blacktooth", 8),
    },
    position: { x: 0, y: 8, z: 0 },
  } satisfies JsonItem<"wall", EditorRoomId, EditorRoomItemId, "blacktooth">,
  ["leftWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "left",
      times: { y: 8 },
      tiles: rotatingSceneryTiles("blacktooth", 8),
    },
    position: { x: 8, y: 0, z: 0 },
  },
  ["towardsWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "towards",
      times: { x: 8 },
    },
    position: { x: 0, y: 0, z: 0 },
  },
  ["rightWall" as EditorRoomItemId]: {
    type: "wall",
    config: {
      direction: "right",
      times: { y: 8 },
    },
    position: { x: 0, y: 0, z: 0 },
  },
};

const starterRoomSize = { x: 8, y: 8 };
/**
 * the room that you start from when you create a room in the editor
 */
export const starterRoom: Omit<EditorRoomJson, "id"> = {
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  size: starterRoomSize,
  items: {
    ...starterRoomWallItems,
    ["floor" as EditorRoomItemId]: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: starterRoomSize,
      },
      position: { x: 0, y: 0, z: 0 },
    },
  },
};
