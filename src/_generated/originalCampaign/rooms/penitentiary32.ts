import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary32",
  items: {
    "block@2,0,4": {
      config: { style: "organic", times: { x: 6, y: 2 } },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary33" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 2 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@0,1,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "monster",
    },
    "slidingDeadly@2,0,5": {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 2, y: 0, z: 5 },
      type: "slidingDeadly",
    },
    "slidingDeadly@2,1,5": {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 2, y: 1, z: 5 },
      type: "slidingDeadly",
    },
    stair1: { config: {}, position: { x: 5, y: 0, z: 0 }, type: "hushPuppy" },
    stair2: { config: {}, position: { x: 6, y: 0, z: 1 }, type: "hushPuppy" },
    teleBackToCrownForHeelsIfSheFallsOffInTheCrownRoom: {
      config: {
        toPosition: { x: 7, y: 5, z: 4 },
        toRoom: "penitentiary34crown",
      },
      position: { x: 7, y: 0, z: 2 },
      type: "teleporter",
    },
    teleTower: {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
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
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary31",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
