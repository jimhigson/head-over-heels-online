import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus2",
  items: {
    "block@0,3,0": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@6,3,3": {
      config: { style: "artificial", times: { x: 2, y: 2 } },
      position: { x: 6, y: 3, z: 3 },
      type: "block",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "egyptus1" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "egyptus3" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "hushPuppy@3,4,0": {
      config: {},
      position: { x: 3, y: 4, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,4,1": {
      config: {},
      position: { x: 4, y: 4, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@5,4,2": {
      config: {},
      position: { x: 5, y: 4, z: 2 },
      type: "hushPuppy",
    },
    "monster@2,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "monster",
    },
    "monster@2,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    "spring@6,3,4": {
      config: {},
      position: { x: 6, y: 3, z: 4 },
      type: "spring",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
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
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
