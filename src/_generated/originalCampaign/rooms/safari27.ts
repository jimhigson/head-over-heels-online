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
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    "monster@4,2,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 4, y: 2, z: 0 },
      type: "monster",
    },
    "monster@4,3,0": {
      config: {
        activated: "on",
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
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["wall", "shield"], times: { y: 2 } },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,4,0": {
      config: { direction: "left", tiles: ["shield", "wall"], times: { y: 2 } },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
