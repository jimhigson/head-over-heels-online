import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "deadly",
  id: "safari3",
  items: {
    "block@1,0,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "door@1,0,5": {
      config: { direction: "towards", toRoom: "safari2" },
      position: { x: 1, y: 0, z: 5 },
      type: "door",
    },
    "door@1,8,5": {
      config: { direction: "away", toRoom: "safari4" },
      position: { x: 1, y: 8, z: 5 },
      type: "door",
    },
    "lift@1,4,0": {
      config: { bottom: 0, top: 8 },
      position: { x: 1, y: 4, z: 0 },
      type: "lift",
    },
    liftExtra: {
      config: { bottom: 0, top: 8 },
      isExtra: true,
      position: { x: 2, y: 4, z: 0 },
      type: "lift",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1fRqC7": {
      config: { direction: "towards", tiles: [] },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards", tiles: [] },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
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
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
