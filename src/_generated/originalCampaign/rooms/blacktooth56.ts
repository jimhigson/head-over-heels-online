import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "market",
  id: "blacktooth56",
  items: {
    "block@3,0,0": {
      config: { style: "organic", times: { y: 2, z: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,3": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "block@3,1,2": {
      config: { style: "organic" },
      position: { x: 3, y: 1, z: 2 },
      type: "block",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "spikes", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,0,4": {
      config: { direction: "right", toRoom: "blacktooth57" },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    "door@8,0,0": {
      config: { direction: "left", toRoom: "blacktooth55" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "jail",
  size: { x: 8, y: 2 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
