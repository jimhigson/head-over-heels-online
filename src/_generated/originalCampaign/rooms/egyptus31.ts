import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "egyptus",
  id: "egyptus31",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "egyptus32" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "lift@5,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 5, y: 0, z: 0 },
      type: "lift",
    },
    "monster@2,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 2, y: 0, z: 0 },
      type: "monster",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus30",
  size: { x: 6, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
