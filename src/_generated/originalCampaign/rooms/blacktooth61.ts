import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "magenta", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "blacktooth61",
  items: {
    "baddie@3,7,1:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 3, y: 7, z: 1 },
      type: "baddie",
    },
    "door@1,0,0:Z1V7DRt": {
      config: { direction: "towards", toRoom: "blacktooth55" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,5:Z1izE3v": {
      config: { direction: "away", toRoom: "blacktooth62fish" },
      position: { x: 1, y: 8, z: 5 },
      type: "door",
    },
    "hushPuppy@0,7,0:13y": {
      config: {},
      position: { x: 0, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@1,7,0:13y": {
      config: {},
      position: { x: 1, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@1,7,1:13y": {
      config: {},
      position: { x: 1, y: 7, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,0:13y": {
      config: {},
      position: { x: 2, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,1:13y": {
      config: {},
      position: { x: 2, y: 7, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,2:13y": {
      config: {},
      position: { x: 2, y: 7, z: 2 },
      type: "hushPuppy",
    },
    "portableBlock@3,7,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 3, y: 7, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "jail",
  size: { x: 4, y: 8 },
  walls: {
    away: ["bars", "none", "none", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
} satisfies RoomJson<"jail", OriginalCampaignRoomId>;
