import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth13",
  items: {
    "deadlyBlock@0,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0:uMs8V": {
      config: { direction: "right", toRoom: "blacktooth12" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,6,0:xRgaU": {
      config: { direction: "away", toRoom: "blacktooth15" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "door@6,2,0:ZUD490": {
      config: { direction: "left", toRoom: "blacktooth14" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 6 },
  walls: {
    away: ["plain", "shield", "none", "none", "shield", "plain"],
    left: ["plain", "shield", "none", "none", "shield", "plain"],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
