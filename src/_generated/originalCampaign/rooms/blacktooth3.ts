import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "none",
  id: "blacktooth3",
  items: {
    "block@3,5,0": {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@4,5,0": {
      config: { style: "organic" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "door@3,6,2": {
      config: { direction: "away", toRoom: "blacktooth2" },
      position: { x: 3, y: 6, z: 2 },
      type: "door",
    },
    scroll: {
      config: {
        gives: "scroll",
        page: 'hintsAndTips',
      },
      position: { x: 7, y: 5, z: 1 },
      type: "pickup",
    },
    scrollBlock: {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth4",
  size: { x: 8, y: 6 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
