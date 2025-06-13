import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth37",
  items: {
    "ball@0,1,0": { config: {}, position: { x: 0, y: 1, z: 0 }, type: "ball" },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "blacktooth36" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "blacktooth38" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 4, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@0,5,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 0, y: 5, z: 0 },
      type: "monster",
    },
    "monster@2,4,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    "monster@3,3,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    "switch@0,7,0": {
      config: {
        initialSetting: "left",
        modifies: [
          {
            expectType: "monster",
            newState: {
              activated: { left: true, right: false },
              everActivated: { left: true },
            },
            targets: ["monster@0,5,0", "monster@2,4,0", "monster@3,3,0"],
          },
        ],
        type: "in-room",
      },
      position: { x: 0, y: 7, z: 0 },
      type: "switch",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { y: 8 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
