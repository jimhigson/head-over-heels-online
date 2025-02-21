import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  ceilingRelativePoint: { x: 4, y: 4 },
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "bookworld28",
  items: {
    "block@0,0,0": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0": {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@0,2,0": {
      config: { style: "organic" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,3,0": {
      config: { style: "artificial" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,5,0": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,6,0": {
      config: { style: "organic" },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@1,0,0": {
      config: { style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,7,0": {
      config: { style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "artificial" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },

    "block@3,7,0": {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,10,0": {
      config: { style: "organic" },
      position: { x: 4, y: 10, z: 0 },
      type: "block",
    },
    "block@4,11,0": {
      config: { style: "organic" },
      position: { x: 4, y: 11, z: 0 },
      type: "block",
    },
    "block@4,12,0": {
      config: { style: "organic" },
      position: { x: 4, y: 12, z: 0 },
      type: "block",
    },
    "block@4,13,0": {
      config: { style: "organic" },
      position: { x: 4, y: 13, z: 0 },
      type: "block",
    },
    "block@4,14,0": {
      config: { style: "organic" },
      position: { x: 4, y: 14, z: 0 },
      type: "block",
    },
    "block@4,15,0": {
      config: { style: "organic" },
      position: { x: 4, y: 15, z: 0 },
      type: "block",
    },
    "block@4,7,0": {
      config: { style: "organic" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@4,8,0": {
      config: { style: "organic" },
      position: { x: 4, y: 8, z: 0 },
      type: "block",
    },
    "extraRunway": {
      config: { style: "organic", times: { y: 8 } },
      isExtra: true,
      position: { x: 3, y: 8, z: 0 },
      type: "block",
    },
    "test": {
      config: { style: "artificial", times: { x: 2, y: 2 } },
      isExtra: true,
      position: { x: 0, y: 14, z: 0 },
      type: "block",
    },
    "test2": {
      config: { style: "artificial", times: { x: 2, y: 2 } },
      isExtra: true,
      position: { x: 6, y: 14, z: 0 },
      type: "block",
    },

    "extraStep": {
      config: { style: "organic", times: { x: 2, z: 2 } },
      isExtra: true,
      position: { x: 3, y: 15, z: 1 },
      type: "block",
    },
    "extraStep2": {
      config: { style: "organic", times: { x: 2 } },
      isExtra: true,
      position: { x: 3, y: 14, z: 1 },
      type: "block",
    },

    "extraBarrier": {
      config: { axis: 'y', times: { y: 6 } },
      isExtra: true,
      position: { x: 2.5, y: 8, z: 1 },
      type: "barrier",
    },
    "extraBarrier2": {
      config: { axis: 'y', times: { y: 6 } },
      isExtra: true,
      position: { x: 4.5, y: 8, z: 1 },
      type: "barrier",
    },
    "extraBarrier3": {
      config: { axis: 'y', times: { y: 2 } },
      isExtra: true,
      position: { x: 4.5, y: 13, z: 2 },
      type: "barrier",
    },
    "extraBarrier4": {
      config: { axis: 'y', times: { y: 2 } },
      isExtra: true,
      position: { x: 4.5, y: 14, z: 3 },
      type: "barrier",
    },
    "extraBarrier5": {
      config: { axis: 'y', times: { y: 2 } },
      isExtra: true,
      position: { x: 2.5, y: 13, z: 2 },
      type: "barrier",
    },
    "extraBarrier6": {
      config: { axis: 'y', times: { y: 2 } },
      isExtra: true,
      position: { x: 2.5, y: 14, z: 3 },
      type: "barrier",
    },


    "block@4,9,0": {
      config: { style: "organic" },
      position: { x: 4, y: 9, z: 0 },
      type: "block",
    },
    "block@5,0,0": {
      config: { style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,7,0": {
      config: { style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "block@6,0,0": {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,7,0": {
      config: { style: "organic" },
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,2,0": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,4,0": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "block@7,5,0": {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "block@7,6,0": {
      config: { style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    "block@7,7,0": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "deadlyBlock@2,3,0": {
      config: { style: "toaster" },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,3,1": {
      config: { style: "toaster" },
      position: { x: 2, y: 3, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,0": {
      config: { style: "toaster" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,1": {
      config: { style: "toaster" },
      position: { x: 3, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0": {
      config: { style: "toaster" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,1": {
      config: { style: "toaster" },
      position: { x: 3, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0": {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,1": {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 1 },
      type: "deadlyBlock",
    },
    "door@3,16,3": {
      config: { direction: "away", toRoom: "bookworld27" },
      position: { x: 3, y: 16, z: 3 },
      type: "door",
    },
    "lift@3,3,1": {
      config: { bottom: 0, top: 16 },
      position: { x: 3, y: 3, z: 3 },
      type: "lift",
    },
  },
  planet: "bookworld",
  roomAbove: "bookworld29",
  size: { x: 8, y: 16 },
  walls: {
    away: ["book", "book", "cowboy", "none", "none", "cowboy", "book", "book"],
    left: [
      "book",
      "cowboy",
      "book",
      "book",
      "book",
      "book",
      "cowboy",
      "book",
      "book",
      "cowboy",
      "book",
      "book",
      "book",
      "book",
      "cowboy",
      "book",
    ],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
