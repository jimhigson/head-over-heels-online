import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "none",
  id: "penitentiary9",
  items: {
    "lift@0,4,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 4, z: 0 },
      type: "lift",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["loop", "loop"], times: { x: 2 } },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
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
        times: { y: 8 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary10",
  roomBelow: "penitentiary8",
  size: { x: 2, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
