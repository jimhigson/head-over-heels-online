import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  height: 11,
  id: "penitentiary8",
  items: {
    b: {
      config: { style: "artificial" },
      position: { x: 0, y: 4, z: 7 },
      type: "block",
    },
    b1: {
      config: { style: "artificial" },
      position: { x: 1, y: 2, z: 2 },
      type: "block",
    },
    b2: {
      config: { style: "artificial", times: { z: 4 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "artificial" },
      position: { x: 0, y: 5, z: 5 },
      type: "block",
    },
    b4: {
      config: { style: "artificial", times: { y: 3 } },
      position: { x: 0, y: 5, z: 4 },
      type: "block",
    },
    b5: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 4, z: 6 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "penitentiary7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 1 },
      type: "portableBlock",
    },
    pr2: {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 3 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "away", tiles: ["loop", "loop"] },
      position: { x: 0, y: 8, z: 0 },
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
  roomAbove: "penitentiary9",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
