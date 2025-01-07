import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "market",
  id: "blacktooth44market",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth45market" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "market",
  roomAbove: "blacktooth22",
  size: { x: 6, y: 6 },
  walls: {
    away: [
      "passage",
      "more-fruits",
      "fruits",
      "more-fruits",
      "fruits",
      "passage",
    ],
    left: [
      "passage",
      "more-fruits",
      "fruits",
      "more-fruits",
      "fruits",
      "passage",
    ],
  },
}) satisfies RoomJson<"market", OriginalCampaignRoomId>;
