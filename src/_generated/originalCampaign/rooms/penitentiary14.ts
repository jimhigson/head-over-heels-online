import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "penitentiary14",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,5,0": {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@2,4,0": {
      config: { style: "organic" },
      position: { x: 2, y: 4, z: 0 },
      type: "block",
    },
    "lift@0,1,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 1, z: 0 },
      type: "lift",
    },
    liftshaftAway0: {
      config: { axis: "x" },
      position: { x: 7, y: 1.5, z: 0 },
      type: "barrier",
    },
    liftshaftAway2: {
      config: { axis: "x" },
      position: { x: 7, y: 1.5, z: 2 },
      type: "barrier",
    },
    liftshaftAway4: {
      config: { axis: "x" },
      position: { x: 7, y: 1.5, z: 4 },
      type: "barrier",
    },
    liftshaftAway6: {
      config: { axis: "x" },
      position: { x: 7, y: 1.5, z: 6 },
      type: "barrier",
    },
    liftshaftRight1: {
      config: { axis: "y" },
      position: { x: 6.5, y: 1, z: 1 },
      type: "barrier",
    },
    liftshaftRight3: {
      config: { axis: "y" },
      position: { x: 6.5, y: 1, z: 3 },
      type: "barrier",
    },
    liftshaftRight5: {
      config: { axis: "y" },
      position: { x: 6.5, y: 1, z: 5 },
      type: "barrier",
    },
    liftshaftRight7: {
      config: { axis: "y" },
      position: { x: 6.5, y: 1, z: 7 },
      type: "barrier",
    },
    liftshaftToward2: {
      config: { axis: "x" },
      position: { x: 7, y: 0.5, z: 2 },
      type: "barrier",
    },
    liftshaftToward4: {
      config: { axis: "x" },
      position: { x: 7, y: 0.5, z: 4 },
      type: "barrier",
    },
    liftshaftToward6: {
      config: { axis: "x" },
      position: { x: 7, y: 0.5, z: 6 },
      type: "barrier",
    },
    "portableBlock@6,5,1": {
      config: { style: "sticks" },
      position: { x: 6, y: 5, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@7,5,1": {
      config: { style: "sticks" },
      position: { x: 7, y: 5, z: 1 },
      type: "portableBlock",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary15",
  roomBelow: "penitentiary13",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
