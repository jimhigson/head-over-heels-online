import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "egyptus",
  id: "egyptus10",
  items: {
    "block@7,2,0": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,2,1": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 1 },
      type: "block",
    },
    "block@7,2,3": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 3 },
      type: "block",
    },
    "block@7,3,3": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 3 },
      type: "block",
    },
    "block@7,4,3": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus9fish" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "egyptus15" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "egyptus11" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "hushPuppy@1,7,0": {
      config: {},
      position: { x: 1, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,1": {
      config: {},
      position: { x: 2, y: 7, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,7,2": {
      config: {},
      position: { x: 3, y: 7, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@4,7,3": {
      config: {},
      position: { x: 4, y: 7, z: 3 },
      type: "hushPuppy",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
