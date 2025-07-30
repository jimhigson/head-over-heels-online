import { cycle, drop, take } from "iter-tools";
import type { JsonItem } from "../../model/json/JsonItem";
import { type SceneryName, type Wall } from "../../sprites/planets";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
  EditorRoomJsonItems,
} from "../editorTypes";
import type { Xy } from "../../utils/vectors/vectors";

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
  market: ["passage", "more-fruits", "fruits", "more-fruits", "fruits"],
  moonbase: ["coil", "window1", "window2", "window3"],
  penitentiary: ["loop", "loop", "skeleton"],
  safari: ["wall", "shield", "wall", "window", "window", "wall", "shield"],
};

export const rotatingSceneryTiles = <S extends SceneryName>(
  sceneryName: S,
  size: number,
  skip: number = 0,
): IterableIterator<Wall<S>> => {
  const c = cycle(wallStarterPatterns[sceneryName]);

  return drop(skip, take(size + skip, c));
};

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
