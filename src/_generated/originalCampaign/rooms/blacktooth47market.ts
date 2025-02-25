import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth47market",
  items: {
    "block@0,1,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@1,0,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,2,0": {
      config: { style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "block@4,7,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@5,6,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 5, y: 6, z: 0 },
      type: "block",
    },
    "block@6,5,0": {
      config: { style: "organic" },
      position: { x: 6, y: 5, z: 0 },
      type: "block",
    },
    "charles@0,7,0": {
      config: {},
      position: { x: 0, y: 7, z: 0 },
      type: "charles",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "blacktooth46market" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,2": {
      config: { direction: "away", toRoom: "blacktooth48market" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    "joystick@0,1,1": {
      config: { controls: ["charles@0,7,0"] },
      position: { x: 0, y: 1, z: 1 },
      type: "joystick",
    },
    "joystick@1,0,1": {
      config: { controls: ["charles@0,7,0"] },
      position: { x: 1, y: 0, z: 1 },
      type: "joystick",
    },
    "joystick@1,2,1": {
      config: { controls: ["charles@0,7,0"] },
      position: { x: 1, y: 2, z: 1 },
      type: "joystick",
    },
    "joystick@2,1,1": {
      config: { controls: ["charles@0,7,0"] },
      position: { x: 2, y: 1, z: 1 },
      type: "joystick",
    },
    "joystick@5,6,1": {
      config: { controls: ["charles@0,7,0"] },
      position: { x: 5, y: 6, z: 1 },
      type: "joystick",
    },
    "joystick@6,5,1": {
      config: { controls: ["charles@0,7,0"] },
      position: { x: 6, y: 5, z: 1 },
      type: "joystick",
    },
    "joystick@6,7,1": {
      config: { controls: ["charles@0,7,0"] },
      position: { x: 6, y: 7, z: 1 },
      type: "joystick",
    },
    "joystick@7,6,1": {
      config: { controls: ["charles@0,7,0"] },
      position: { x: 7, y: 6, z: 1 },
      type: "joystick",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["passage", "more-fruits", "fruits"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["more-fruits", "fruits", "passage"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
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
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"market", OriginalCampaignRoomId>;
