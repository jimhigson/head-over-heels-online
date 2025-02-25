import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld20",
  items: {
    "door@2,0,4": {
      config: { direction: "towards", toRoom: "bookworld34" },
      position: { x: 2, y: 0, z: 4 },
      type: "door",
    },
    "door@2,6,0": {
      config: { direction: "away", toRoom: "bookworld19" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "door@6,2,0": {
      config: { direction: "left", toRoom: "bookworld26" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
    "hushPuppy@1,0,0": {
      config: {},
      position: { x: 1, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,0,1": {
      config: {},
      position: { x: 2, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,0,2": {
      config: {},
      position: { x: 3, y: 0, z: 2 },
      type: "hushPuppy",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: { direction: "away", tiles: ["book", "book"], times: { x: 2 } },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: { direction: "away", tiles: ["book", "book"], times: { x: 2 } },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: { direction: "left", tiles: ["book", "book"], times: { y: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,4,0": {
      config: { direction: "left", tiles: ["book", "book"], times: { y: 2 } },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
