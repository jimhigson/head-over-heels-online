import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "bookworld20",
  items: {
    "door@2,0,4": {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "bookworld34",
      },
      position: { x: 4, y: 0, z: 4 },
      type: "door",
    },
    "door@2,6,0": {
      config: { direction: "away", toRoom: "bookworld19" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "door@6,2,0": {
      config: { direction: "left", toRoom: "bookworld26" },
      position: { x: 6, y: 4, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    hushPuppy4: {
      config: { times: { x: 3 } },
      position: { x: 3, y: 0, z: 3 },
      type: "hushPuppy",
    },
    "hushPuppy@1,0,0": {
      config: {},
      position: { x: 0, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,0,1": {
      config: {},
      position: { x: 1, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,0,2": {
      config: {},
      position: { x: 2, y: 0, z: 2 },
      type: "hushPuppy",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: { direction: "away", tiles: ["book", "book"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: { direction: "away", tiles: ["book", "book"] },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: { direction: "left", tiles: ["book", "book", "book", "book"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
