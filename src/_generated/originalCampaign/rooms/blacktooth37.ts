import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth37",
  items: {
    b: {
      config: { style: "organic", times: { y: 5 } },
      position: { x: 3, y: 2, z: 2 },
      type: "block",
    },
    b1: {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 3, y: 6, z: 0 },
      type: "block",
    },
    bl: { config: {}, position: { x: 0, y: 1, z: 0 }, type: "ball" },
    d: {
      config: { direction: "towards", toRoom: "blacktooth36" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth38" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 4, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 0, y: 5, z: 0 },
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
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "jumps" },
      position: { x: 3, y: 6, z: 3 },
      type: "pickup",
    },
    sw: {
      config: {
        initialSetting: "left",
        modifies: [{ activates: true, expectType: "monster" }],
        type: "in-room",
      },
      position: { x: 0, y: 7, z: 0 },
      type: "switch",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
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
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
