import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "moonbase3",
  items: {
    b: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 2, y: 4, z: 0 },
      type: "block",
    },
    ch: { config: {}, position: { x: 7, y: 7, z: 1 }, type: "charles" },
    d: {
      config: { direction: "towards", toRoom: "moonbase2" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "moonbase13" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    j: { config: {}, position: { x: 1, y: 1, z: 1 }, type: "joystick" },
    j1: { config: {}, position: { x: 2, y: 0, z: 1 }, type: "joystick" },
    j2: { config: {}, position: { x: 2, y: 2, z: 1 }, type: "joystick" },
    j3: { config: {}, position: { x: 3, y: 1, z: 1 }, type: "joystick" },
    mp: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "towards",
      },
      position: { x: 0, y: 7, z: 0 },
      type: "movingPlatform",
    },
    sg: { config: {}, position: { x: 4, y: 7, z: 0 }, type: "spring" },
    sk: { config: {}, position: { x: 0, y: 1, z: 0 }, type: "spikes" },
    sk1: {
      config: { times: { x: 2 } },
      position: { x: 1, y: 4, z: 1 },
      type: "spikes",
    },
    sk2: { config: {}, position: { x: 7, y: 7, z: 0 }, type: "spikes" },
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
      config: { direction: "away", tiles: ["window3", "coil", "window2"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["window2", "coil", "window1"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
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
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
