import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  id: "safari1",
  items: {
    "door@2,8,0": {
      config: { direction: "away", toRoom: "safari2" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    "teleporter@2,3,0": {
      config: {
        toPosition: { x: 2, y: 3, z: 0 },
        toRoom: "moonbase21tosafari",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,4,0": {
      config: {
        toPosition: { x: 2, y: 4, z: 0 },
        toRoom: "moonbase21tosafari",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0": {
      config: {
        toPosition: { x: 3, y: 3, z: 0 },
        toRoom: "moonbase21tosafari",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0": {
      config: {
        toPosition: { x: 3, y: 4, z: 0 },
        toRoom: "moonbase21tosafari",
      },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["wall", "shield"], times: { x: 2 } },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,8,0": {
      config: { direction: "away", tiles: ["shield", "wall"], times: { x: 2 } },
      position: { x: 4, y: 8, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { y: 8 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 6, y: 8 },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
