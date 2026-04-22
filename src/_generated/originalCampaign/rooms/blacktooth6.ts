import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "blacktooth6",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b2: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    b4: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    b7: {
      config: { style: "organic" },
      position: { x: 2, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth5" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 0, z: 5 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 7, z: 7 },
      type: "monster",
    },
    m3: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 6, y: 7, z: 4 },
      type: "monster",
    },
    m4: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 3, z: 3 },
      type: "monster",
    },
    m5: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 6 },
      type: "monster",
    },
    pi: {
      config: { gives: "doughnuts" },
      position: { x: 7, y: 7, z: 1 },
      type: "pickup",
    },
    pi1: {
      config: { gives: "scroll", page: "doughnuts", source: "manual" },
      position: { x: 2, y: 3, z: 1 },
      type: "pickup",
    },
    sw: {
      config: {
        initialSetting: "left",
        modifies: [
          { expectType: "block", makesStable: false, targets: ["b2", "b4"] },
          { activates: true, expectType: "monster" },
        ],
        type: "in-room",
      },
      position: { x: 6, y: 0, z: 1 },
      type: "switch",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
