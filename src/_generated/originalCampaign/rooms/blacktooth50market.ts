import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "market",
  id: "blacktooth50market",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "blacktooth49market" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth51" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth52market" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "monster@0,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 0, y: 0, z: 0 },
      type: "monster",
    },
    "monster@4,7,0": {
      config: {
        activated: true,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 4, y: 7, z: 0 },
      type: "monster",
    },
    "monster@7,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 7, y: 0, z: 0 },
      type: "monster",
    },
  },
  planet: "market",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
    ],
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
