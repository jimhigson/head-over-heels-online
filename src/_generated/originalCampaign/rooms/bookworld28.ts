import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  ceilingRelativePoint: { x: 4, y: 4 },
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "bookworld28",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "jumpingOff2": {
      config: { style: "artificial" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "afterJumpingOFf2": {
      config: { style: "organic", times: { x: 4 } },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "jumpingOff": {
      config: { style: "artificial" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "afterJumpingOFf": {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@4,8,0": {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 3, y: 8, z: 0 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "deadlyBlock@2,3,0": {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,0": {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0": {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0": {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,16,3": {
      config: { direction: "away", toRoom: "bookworld27" },
      position: { x: 3, y: 16, z: 3 },
      type: "door",
    },
    extraBarrier: {
      config: { axis: "y", times: { y: 6 } },
      isExtra: true,
      position: { x: 2.5, y: 8, z: 1 },
      type: "barrier",
    },
    extraBarrier2: {
      config: { axis: "y", times: { y: 6 } },
      isExtra: true,
      position: { x: 4.5, y: 8, z: 1 },
      type: "barrier",
    },
    extraBarrier3: {
      config: { axis: "y", times: { y: 2 } },
      isExtra: true,
      position: { x: 4.5, y: 13, z: 2 },
      type: "barrier",
    },
    extraBarrier4: {
      config: { axis: "y", times: { y: 2 } },
      isExtra: true,
      position: { x: 4.5, y: 14, z: 3 },
      type: "barrier",
    },
    extraBarrier5: {
      config: { axis: "y", times: { y: 2 } },
      isExtra: true,
      position: { x: 2.5, y: 13, z: 2 },
      type: "barrier",
    },
    extraBarrier6: {
      config: { axis: "y", times: { y: 2 } },
      isExtra: true,
      position: { x: 2.5, y: 14, z: 3 },
      type: "barrier",
    },
    extraStep: {
      config: { style: "organic", times: { x: 2, z: 2 } },
      isExtra: true,
      position: { x: 3, y: 15, z: 1 },
      type: "block",
    },
    extraStep2: {
      config: { style: "organic", times: { x: 2 } },
      isExtra: true,
      position: { x: 3, y: 14, z: 1 },
      type: "block",
    },
    "lift@3,3,1": {
      config: { bottom: 0, top: 16 },
      position: { x: 3, y: 3, z: 3 },
      type: "lift",
    },
    test: {
      config: { style: "artificial", times: { x: 2, y: 2 } },
      isExtra: true,
      position: { x: 0, y: 14, z: 0 },
      type: "block",
    },
    test2: {
      config: { style: "artificial", times: { x: 2, y: 2 } },
      isExtra: true,
      position: { x: 6, y: 14, z: 0 },
      type: "block",
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
