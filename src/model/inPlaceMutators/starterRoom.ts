import type { Xy, Xyz } from "../../utils/vectors/vectors";
import type { JsonItem } from "../json/JsonItem";
import type { RoomJson, RoomJsonItems } from "../RoomJson";

import { originXyz } from "../../utils/vectors/vectors";
import { rotatingSceneryTiles } from "./rotatingSceneryTiles";

const starterRoomWallItems = <RoomId extends string, RoomItemId extends string>(
  size: Xy,
  roomOrigin: Xyz,
): RoomJsonItems<RoomItemId, RoomId> =>
  ({
    ["wA" as RoomItemId]: {
      type: "wall",
      config: {
        direction: "away",
        tiles: Array.from(rotatingSceneryTiles("blacktooth", size.x)),
      },
      position: { x: roomOrigin.x, y: roomOrigin.y + size.y, z: roomOrigin.z },
    } satisfies JsonItem<"wall", RoomId, RoomItemId, "blacktooth">,
    ["wL" as RoomItemId]: {
      type: "wall",
      config: {
        direction: "left",
        tiles: Array.from(rotatingSceneryTiles("blacktooth", size.y)),
      },
      position: { x: roomOrigin.x + size.x, y: roomOrigin.y, z: roomOrigin.z },
    } satisfies JsonItem<"wall", RoomId, RoomItemId, "blacktooth">,
    ["wT" as RoomItemId]: {
      type: "wall",
      config: {
        direction: "towards",
        times: { x: size.x },
      },
      position: { ...roomOrigin },
    } satisfies JsonItem<"wall", RoomId, RoomItemId, "blacktooth">,
    ["wR" as RoomItemId]: {
      type: "wall",
      config: {
        direction: "right",
        times: { y: size.y },
      },
      position: { ...roomOrigin },
    } satisfies JsonItem<"wall", RoomId, RoomItemId, "blacktooth">,
  }) as RoomJsonItems<RoomItemId, RoomId>;

export const starterRoom = <RoomId extends string, RoomItemId extends string>(
  size: Xy,
  roomOrigin: Xyz = originXyz,
): Omit<RoomJson<RoomId, RoomItemId>, "id"> => ({
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    ["floor" as RoomItemId]: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: size,
      },
      position: { ...roomOrigin },
    },
    ...starterRoomWallItems<RoomId, RoomItemId>(size, roomOrigin),
  },
});
