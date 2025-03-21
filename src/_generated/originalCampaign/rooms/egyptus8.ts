import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "egyptus",
  id: "egyptus8",
  items: {
    "ball@1,1,3": { config: {}, position: { x: 1, y: 1, z: 3 }, type: "ball" },
    "ball@1,6,3": { config: {}, position: { x: 1, y: 6, z: 3 }, type: "ball" },
    "ball@6,1,3": { config: {}, position: { x: 6, y: 1, z: 3 }, type: "ball" },
    "ball@6,6,3": { config: {}, position: { x: 6, y: 6, z: 3 }, type: "ball" },
    "block@1,1,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,6,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@6,1,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,6,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "egyptus7" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus6" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "egyptus9fish" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "monster@4,2,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 6, y: 6, z: 4 },
      type: "monster",
    },
    "monster@4,5,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 6, y: 1, z: 4 },
      type: "monster",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
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
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
