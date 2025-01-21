import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "blacktooth",
  id: "blacktooth7",
  items: {
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "blacktooth8fish" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "blacktooth5" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "door@2,3,0": {
      config: { direction: "left", toRoom: "blacktooth10" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
