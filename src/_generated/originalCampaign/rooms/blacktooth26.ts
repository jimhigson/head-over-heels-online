import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth26",
  items: {
    "conveyor@2,5,0": {
      config: { direction: "right", times: { x: 4 } },
      position: { x: 2, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,2,0": {
      config: { direction: "away", times: { y: 3 } },
      position: { x: 5, y: 2, z: 0 },
      type: "conveyor",
    },
    "door@2,6,2": {
      config: { direction: "away", toRoom: "blacktooth27fish" },
      position: { x: 2, y: 6, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 6, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "lift@5,0,0": {
      config: { bottom: 0, top: 7 },
      position: { x: 5, y: 0, z: 0 },
      type: "lift",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: { direction: "away", tiles: ["bars", "bars"], times: { x: 2 } },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: { direction: "away", tiles: ["bars", "bars"], times: { x: 2 } },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth25",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
