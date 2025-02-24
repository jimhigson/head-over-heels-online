import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "market",
  id: "blacktooth11",
  items: {
    "block@2,0,0": {
      config: { style: "organic", times: { y: 8, z: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,2": {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 3, y: 0, z: 2 },
      type: "block",
    },
    "block@5,0,0": {
      config: { style: "organic", times: { y: 8, z: 2 } },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "blacktooth10" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth31" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "blacktooth32" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth12" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "jail",
  size: { x: 8, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
