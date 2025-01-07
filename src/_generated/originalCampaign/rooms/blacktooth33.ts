import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth33",
  items: {
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth32" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "lift@7,7,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    "monster@0,3,0": {
      config: {
        activated: true,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 3, z: 0 },
      type: "monster",
    },
    "monster@7,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 0 },
      type: "monster",
    },
    "pickup@0,7,0": {
      config: { gives: "jumps" },
      position: { x: 0, y: 7, z: 0 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth34",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
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
