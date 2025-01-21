import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth65",
  items: {
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "blacktooth64" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "blacktooth66" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "monster@1,4,0": {
      config: {
        activated: true,
        movement: "clockwise",
        startDirection: "right",
        which: "turtle",
      },
      position: { x: 1, y: 4, z: 0 },
      type: "monster",
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
