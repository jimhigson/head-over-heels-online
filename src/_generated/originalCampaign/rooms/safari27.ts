import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  id: "safari27",
  items: {
    "door@0,2,4": {
      config: { direction: "right", toRoom: "safari26" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    "door@8,2,4": {
      config: { direction: "left", toRoom: "safari28" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    "monster@3,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    "monster@4,2,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 4, y: 2, z: 0 },
      type: "monster",
    },
    "monster@4,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "elephant",
      },
      position: { x: 4, y: 3, z: 0 },
      type: "monster",
    },
    "spring@3,2,0": {
      config: {},
      position: { x: 3, y: 2, z: 0 },
      type: "spring",
    },
  },
  planet: "safari",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: ["wall", "shield", "none", "none", "shield", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
