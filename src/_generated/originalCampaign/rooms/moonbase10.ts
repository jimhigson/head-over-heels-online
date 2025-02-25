import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "deadly",
  id: "moonbase10",
  items: {
    "block@0,3,3": {
      config: { style: "artificial" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "block@0,7,3": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@0,7,5": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 5 },
      type: "block",
    },
    "block@4,7,3": {
      config: { style: "artificial" },
      position: { x: 4, y: 7, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,7,6": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 6 },
      type: "deadlyBlock",
    },
    "door@0,3,5": {
      config: { direction: "right", toRoom: "moonbase9" },
      position: { x: 0, y: 3, z: 5 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "moonbase11" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    extra0a: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    extra1a: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 4, y: 7, z: 1 },
      type: "block",
    },
    extra2a: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 4, y: 7, z: 2 },
      type: "block",
    },
    extrab0: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    extrab1: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 0, y: 3, z: 1 },
      type: "block",
    },
    extrab2: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 0, y: 3, z: 2 },
      type: "block",
    },
    extrac0: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    extrac1: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    extrac2: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 0, y: 7, z: 2 },
      type: "block",
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
        tiles: ["window3", "coil", "window2"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["window2", "coil", "window1"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
