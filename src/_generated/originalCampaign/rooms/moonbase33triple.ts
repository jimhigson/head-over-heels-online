import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "moonbase33triple",
  items: {
    b: {
      config: { style: "artificial", times: { z: 2 } },
      position: { x: 5, y: 15, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial" },
      position: { x: 4, y: 15, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "left", toRoom: "moonbase34" },
      position: { x: 12, y: 11, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "moonbase36" },
      position: { x: 2, y: 16, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "towards", toRoom: "moonbase32" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 0, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster", times: { y: 5 } },
      position: { x: 11, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "toaster" },
      position: { x: 11, y: 14, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "toaster" },
      position: { x: 11, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "toaster", times: { x: 2, y: 4 } },
      position: { x: 5, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 6, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 6, y: 16 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "floor",
    },
    f1: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 10, z: 1 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 11, z: 1 },
      type: "monster",
    },
    m10: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 9, z: 1 },
      type: "monster",
    },
    m11: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 10, z: 1 },
      type: "monster",
    },
    m12: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 11, z: 1 },
      type: "monster",
    },
    m13: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 12, z: 1 },
      type: "monster",
    },
    m14: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 5, y: 13, z: 1 },
      type: "monster",
    },
    m15: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 10, z: 1 },
      type: "monster",
    },
    m16: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 11, z: 1 },
      type: "monster",
    },
    m17: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 12, z: 1 },
      type: "monster",
    },
    m18: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 13, z: 1 },
      type: "monster",
    },
    m19: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 2, z: 1 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 12, z: 1 },
      type: "monster",
    },
    m20: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 3, z: 1 },
      type: "monster",
    },
    m21: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 4, z: 1 },
      type: "monster",
    },
    m22: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 6, y: 5, z: 1 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: { x: 0, y: 13, z: 1 },
      type: "monster",
    },
    m4: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 1, z: 1 },
      type: "monster",
    },
    m5: {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 14, z: 1 },
      type: "monster",
    },
    m6: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 2, z: 1 },
      type: "monster",
    },
    m7: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 3, z: 1 },
      type: "monster",
    },
    m8: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 4, z: 1 },
      type: "monster",
    },
    m9: {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 11, y: 5, z: 1 },
      type: "monster",
    },
    sw: {
      config: {
        initialSetting: "right",
        modifies: [{ activates: true, expectType: "monster" }],
        type: "in-room",
      },
      position: { x: 5, y: 15, z: 2 },
      type: "switch",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["window2", "window3"] },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 10, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: {
        direction: "left",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
          "window3",
          "coil",
          "window2",
        ],
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    w7: {
      config: { direction: "left", tiles: ["window2", "coil", "window1"] },
      position: { x: 12, y: 13, z: 0 },
      type: "wall",
    },
    w8: {
      config: {
        direction: "away",
        tiles: [
          "window3",
          "window1",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window1",
        ],
      },
      position: { x: 4, y: 16, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 12, y: 8 } },
      },
      middle: {
        gridPosition: { x: 1, y: 1 },
        physicalPosition: { from: { x: 6, y: 8 }, to: { x: 12, y: 16 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 6, y: 16 } },
      },
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
