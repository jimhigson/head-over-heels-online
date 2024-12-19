import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth32",
  items: {
    "door@0,0,0:Z1V8bV0": {
      config: { direction: "towards", toRoom: "blacktooth11" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0:xRvFa": {
      config: { direction: "away", toRoom: "blacktooth33" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
