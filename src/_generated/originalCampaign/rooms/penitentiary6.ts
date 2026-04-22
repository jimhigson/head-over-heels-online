import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "penitentiary6",
  items: {
    b: {
      config: { style: "artificial" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "left", toRoom: "penitentiary7" },
      position: { x: 6, y: 2, z: 3 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "none", times: { x: 6, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    mp: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "towards",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "movingPlatform",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["loop", "loop"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["loop", "loop"] },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary5",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
