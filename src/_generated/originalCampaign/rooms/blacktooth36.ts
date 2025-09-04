import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "blacktooth36",
  items: {
    "door@0,2,0": {
      config: {
        direction: "right",
        meta: { toSubRoom: "right" },
        toRoom: "blacktooth35",
      },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,6,0": {
      config: { direction: "away", toRoom: "blacktooth37" },
      position: { x: 4, y: 6, z: 2 },
      type: "door",
    },
    extraBall: { config: {}, position: { x: 4, y: 0, z: 0 }, type: "ball" },
    extraBall2: { config: {}, position: { x: 7, y: 2, z: 0 }, type: "ball" },
    extraMonster: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "left",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 2, y: 0, z: 0 },
      type: "monster",
    },
    extraMonster2: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "towards",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 7, y: 5, z: 0 },
      type: "monster",
    },
    extraMonster3: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 7, y: 0, z: 0 },
      type: "monster",
    },
    extraMonster4: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "away",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 7, y: 1, z: 0 },
      type: "monster",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    monsterSwitch: {
      config: {
        initialSetting: "left",
        modifies: [{ activates: true, expectType: "monster" }],
        type: "in-room",
      },
      position: { x: 4, y: 3, z: 2 },
      type: "switch",
    },
    raisedPlatform: {
      config: { style: "artificial", times: { x: 2, y: 4 } },
      position: { x: 4, y: 2, z: 1 },
      type: "block",
    },
    raisedPlatformSupport: {
      config: { style: "tower", times: { x: 2 } },
      position: { x: 4, y: 2, z: 0 },
      type: "block",
    },
    raisedPlatformSupport2: {
      config: { style: "tower", times: { x: 2 } },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield", "shield", "plain"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: { direction: "away", tiles: ["plain", "plain"] },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "plain", "shield", "shield", "plain", "plain"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
