import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "safari27",
  items: {
    d: {
      config: {
        direction: "right",
        meta: { toSubRoom: "right" },
        toRoom: "safari26",
      },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari28" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 4, y: 2, z: 0 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4",
        which: "elephant",
      },
      position: { x: 4, y: 3, z: 0 },
      type: "monster",
    },
    sg: { config: {}, position: { x: 3, y: 2, z: 0 }, type: "spring" },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
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
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["wall", "shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
