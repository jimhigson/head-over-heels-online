import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth86",
  items: {
    "baddie@1,3,0:1Sur9": {
      config: { activated: true, which: "flying-ball" },
      position: { x: 1, y: 3, z: 0 },
      type: "baddie",
    },
    "door@1,0,0:1CAEsF": {
      config: { direction: "towards", toRoom: "blacktooth87crown" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0:xSbdy": {
      config: { direction: "away", toRoom: "blacktooth85" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 8 },
  walls: {
    away: ["shield", "none", "none", "shield"],
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
