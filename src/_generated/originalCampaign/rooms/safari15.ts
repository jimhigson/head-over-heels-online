import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "safari15",
  items: {
    br: {
      config: { axis: "x" },
      position: { x: 1, y: 9, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "towards", toRoom: "safari13" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "safari16" },
      position: { x: 1, y: 16, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano" },
      position: { x: 3, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 4, y: 16 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 1, y: 4, z: 0 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 12, z: 1 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "monster",
    },
    sk: { config: {}, position: { x: 0, y: 13, z: 0 }, type: "spikes" },
    sk1: { config: {}, position: { x: 0, y: 9, z: 0 }, type: "spikes" },
    sk2: { config: {}, position: { x: 1, y: 11, z: 0 }, type: "spikes" },
    sk3: { config: {}, position: { x: 2, y: 12, z: 0 }, type: "spikes" },
    sk4: { config: {}, position: { x: 2, y: 9, z: 0 }, type: "spikes" },
    sk5: { config: {}, position: { x: 3, y: 10, z: 0 }, type: "spikes" },
    sk6: { config: {}, position: { x: 3, y: 14, z: 0 }, type: "spikes" },
    w: {
      config: { direction: "right", times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 3, y: 16, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
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
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 4, y: 8 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 4, y: 16 } },
      },
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
