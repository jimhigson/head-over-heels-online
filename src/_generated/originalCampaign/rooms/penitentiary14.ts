import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary14",
  items: {
    b: {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { x: 5 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    br: {
      config: { axis: "x" },
      position: { x: 7, y: 1.5, z: 0 },
      type: "barrier",
    },
    br1: {
      config: { axis: "x" },
      position: { x: 7, y: 1.5, z: 2 },
      type: "barrier",
    },
    br10: {
      config: { axis: "x" },
      position: { x: 7, y: 0.5, z: 6 },
      type: "barrier",
    },
    br2: {
      config: { axis: "x" },
      position: { x: 7, y: 1.5, z: 4 },
      type: "barrier",
    },
    br3: {
      config: { axis: "x" },
      position: { x: 7, y: 1.5, z: 6 },
      type: "barrier",
    },
    br4: {
      config: { axis: "y" },
      position: { x: 6.5, y: 1, z: 1 },
      type: "barrier",
    },
    br5: {
      config: { axis: "y" },
      position: { x: 6.5, y: 1, z: 3 },
      type: "barrier",
    },
    br6: {
      config: { axis: "y" },
      position: { x: 6.5, y: 1, z: 5 },
      type: "barrier",
    },
    br7: {
      config: { axis: "y" },
      position: { x: 6.5, y: 1, z: 7 },
      type: "barrier",
    },
    br8: {
      config: { axis: "x" },
      position: { x: 7, y: 0.5, z: 2 },
      type: "barrier",
    },
    br9: {
      config: { axis: "x" },
      position: { x: 7, y: 0.5, z: 4 },
      type: "barrier",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 1, z: 0 },
      type: "lift",
    },
    pr: {
      config: { style: "sticks" },
      position: { x: 6, y: 5, z: 1 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "sticks" },
      position: { x: 7, y: 5, z: 1 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: [
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary15",
  roomBelow: "penitentiary13",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
