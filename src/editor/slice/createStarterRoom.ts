import type { JsonItem } from "../../model/json/JsonItem";
import type { RoomJson } from "../../model/RoomJson";
import { type SceneryName, type Wall } from "../../sprites/planets";
import type {
  EditorRoomId,
  EditorRoomItemId,
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

export const rotatingSceneryTile = <S extends SceneryName>(
  sceneryName: S,
  n: number,
): Wall<S> => {
  const pattern = wallStarterPatterns[sceneryName];
  return pattern[n % pattern.length];
};
export const rotatingSceneryTiles = <S extends SceneryName>(
  sceneryName: S,
  size: number,
): Wall<S>[] => {
  return new Array(size)
    .fill(0)
    .map((_n, i) => rotatingSceneryTile(sceneryName, i));
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

/**
 * the room that you start from when you create a room in the editor
 */
export const starterRoom: Omit<
  RoomJson<EditorRoomId, EditorRoomItemId>,
  "id"
> = {
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  items: {
    ...starterRoomWallItems,
  },
  size: { x: 8, y: 8 },
};
