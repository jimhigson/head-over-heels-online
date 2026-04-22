import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth62fish",
  items: {
    b: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 9 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 5, y: 15, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 5, y: 9, z: 0 },
      type: "block",
    },
    co: {
      config: { direction: "away", times: { y: 5 } },
      position: { x: 5, y: 4, z: 0 },
      type: "conveyor",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth63" },
      position: { x: 0, y: 7, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "blacktooth61" },
      position: { x: 1, y: 0, z: 1 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 6, y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "reincarnation" },
      position: { x: 5, y: 15, z: 1 },
      type: "pickup",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 0, y: 1, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 0, y: 2, z: 0 },
      type: "portableBlock",
    },
    sg: { config: {}, position: { x: 0, y: 6, z: 0 }, type: "spring" },
    sg1: { config: {}, position: { x: 4, y: 15, z: 0 }, type: "spring" },
    sg2: { config: {}, position: { x: 5, y: 12, z: 0 }, type: "spring" },
    w: {
      config: { direction: "right", times: { y: 7 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 7 } },
      position: { x: 0, y: 9, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
        ],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 6 }, to: { x: 6, y: 16 } },
      },
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
