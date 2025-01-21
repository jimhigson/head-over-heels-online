import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "blacktooth",
  id: "blacktooth29",
  items: {
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "blacktooth27fish" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "lift@0,7,7": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 7, z: 7 },
      type: "lift",
    },
    "monster@0,6,0": {
      config: {
        activated: true,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "monster",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth30",
  size: { x: 6, y: 8 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
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
