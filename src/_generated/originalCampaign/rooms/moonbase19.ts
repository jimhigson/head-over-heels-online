import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "moonbase19",
  items: {
    d: {
      config: { direction: "right", toRoom: "moonbase11" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "moonbase20" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 2 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 4, y: 0, z: 1 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: { x: 5, y: 0, z: 1 },
      type: "monster",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "away",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
