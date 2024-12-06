import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase12",
  items: {
    "block@0,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "block@0,2,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    "block@0,3,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "block@0,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    "block@1,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 3 },
      type: "block",
    },
    "block@2,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 3 },
      type: "block",
    },
    "block@3,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "block@4,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "block@5,0,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 0, z: 3 },
      type: "block",
    },
    "door@0,3,4:Z1kG3iK": {
      config: { direction: "right", toRoom: "moonbase18" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,0,0:5Csya": {
      config: { direction: "towards", toRoom: "moonbase11" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "hushPuppy@5,0,0:13y": {
      config: {},
      position: { x: 5, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,0,1:13y": {
      config: {},
      position: { x: 6, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@7,0,2:13y": {
      config: {},
      position: { x: 7, y: 0, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
    left: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
  },
} satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
