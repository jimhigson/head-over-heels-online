import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "blacktooth47market",
  items: {
    b: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 5, y: 6, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic" },
      position: { x: 6, y: 5, z: 0 },
      type: "block",
    },
    ch: { config: {}, position: { x: 0, y: 7, z: 0 }, type: "charles" },
    d: {
      config: { direction: "towards", toRoom: "blacktooth46market" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth48market" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    j: { config: {}, position: { x: 0, y: 1, z: 1 }, type: "joystick" },
    j1: { config: {}, position: { x: 1, y: 0, z: 1 }, type: "joystick" },
    j2: { config: {}, position: { x: 1, y: 2, z: 1 }, type: "joystick" },
    j3: { config: {}, position: { x: 2, y: 1, z: 1 }, type: "joystick" },
    j4: { config: {}, position: { x: 5, y: 6, z: 1 }, type: "joystick" },
    j5: { config: {}, position: { x: 6, y: 5, z: 1 }, type: "joystick" },
    j6: { config: {}, position: { x: 6, y: 7, z: 1 }, type: "joystick" },
    j7: { config: {}, position: { x: 7, y: 6, z: 1 }, type: "joystick" },
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
        tiles: ["passage", "more-fruits", "fruits"],
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
      config: {
        direction: "away",
        tiles: ["more-fruits", "fruits", "passage"],
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "more-fruits",
          "fruits",
          "passage",
          "more-fruits",
          "fruits",
          "passage",
          "more-fruits",
          "fruits",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
