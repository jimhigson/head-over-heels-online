import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "market",
  id: "blacktooth48market",
  items: {
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "blacktooth47market" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@2,3,0": {
      config: { direction: "left", toRoom: "blacktooth49market" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    scroll: {
      config: { gives: "scroll", page: "blacktooth" },
      position: { x: 1, y: 6, z: 0 },
      type: "pickup",
    },
  },
  planet: "market",
  size: { x: 2, y: 8 },
  walls: {
    away: ["more-fruits", "fruits"],
    left: [
      "passage",
      "more-fruits",
      "fruits",
      "none",
      "none",
      "more-fruits",
      "fruits",
      "passage",
    ],
  },
}) satisfies RoomJson<"market", OriginalCampaignRoomId>;
