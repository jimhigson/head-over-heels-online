import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth58triple",
  items: {
    b: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 11, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 13, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 13, y: 3, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 5 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 8, y: 0, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 8, y: 5, z: 0 },
      type: "block",
    },
    b7: {
      config: { style: "organic" },
      position: { x: 0, y: 9, z: 0 },
      type: "block",
    },
    co: {
      config: { direction: "away", times: { y: 2 } },
      position: { x: 5, y: 5, z: 0 },
      type: "conveyor",
    },
    co1: {
      config: { direction: "left" },
      position: { x: 6, y: 5, z: 0 },
      type: "conveyor",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth57" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth59" },
      position: { x: 2, y: 14, z: 2 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 14, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    f1: {
      config: { floorType: "deadly", times: { x: 6, y: 8 } },
      position: { x: 0, y: 6, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 4, y: 9, z: 1 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 7, y: 3, z: 1 },
      type: "monster",
    },
    pi: {
      config: { gives: "fast" },
      position: { x: 13, y: 5, z: 1 },
      type: "pickup",
    },
    sk: { config: {}, position: { x: 0, y: 9, z: 1 }, type: "spikes" },
    sk1: {
      config: { times: { y: 2 } },
      position: { x: 4, y: 8, z: 0 },
      type: "spikes",
    },
    w: {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 14 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["bars", "bars"] },
      position: { x: 0, y: 14, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 14, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "towards", times: { x: 10 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w7: {
      config: { direction: "away", tiles: ["bars", "bars"] },
      position: { x: 4, y: 14, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 14, y: 6 } },
      },
      middle: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 6 }, to: { x: 6, y: 14 } },
      },
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
