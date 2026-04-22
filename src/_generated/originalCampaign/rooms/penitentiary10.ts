import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "penitentiary10",
  items: {
    b: {
      config: { style: "artificial" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "penitentiary11" },
      position: { x: 0, y: 8, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 2, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "left",
        tiles: [
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary9",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
