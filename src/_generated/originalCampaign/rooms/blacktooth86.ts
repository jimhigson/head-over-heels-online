import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth86",
  items: {
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "blacktooth87crown" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "blacktooth85" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "monster@1,3,0": {
      config: {
        activated: true,
        movement: "towards-when-in-square-xy8-unless-planet-crowns",
        which: "emperorsGuardian",
      },
      position: { x: 1, y: 3, z: 0 },
      type: "monster",
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
