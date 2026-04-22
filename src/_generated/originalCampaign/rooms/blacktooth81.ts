import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth81",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    ch: { config: {}, position: { x: 0, y: 7, z: 3 }, type: "charles" },
    d: {
      config: { direction: "towards", toRoom: "blacktooth80" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth82" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    j: { config: {}, position: { x: 1, y: 2, z: 0 }, type: "joystick" },
    j1: { config: {}, position: { x: 1, y: 5, z: 0 }, type: "joystick" },
    j2: { config: {}, position: { x: 4, y: 2, z: 0 }, type: "joystick" },
    j3: { config: {}, position: { x: 4, y: 5, z: 0 }, type: "joystick" },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "monster",
    },
    mp: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
      },
      position: { x: 6, y: 7, z: 0 },
      type: "movingPlatform",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
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
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
