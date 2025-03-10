import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "market",
  id: "blacktooth46market",
  items: {
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "blacktooth45market" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,6,3": {
      config: { direction: "away", toRoom: "blacktooth47market" },
      position: { x: 2, y: 6, z: 3 },
      type: "door",
    },
    "portableBlock@0,0,0": {
      config: { style: "cube" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["more-fruits", "fruits"],
        times: { x: 2 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: {
        direction: "away",
        tiles: ["more-fruits", "fruits"],
        times: { x: 2 },
      },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: [
          "passage",
          "more-fruits",
          "fruits",
          "more-fruits",
          "fruits",
          "passage",
        ],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
  roomAbove: "blacktooth43",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
