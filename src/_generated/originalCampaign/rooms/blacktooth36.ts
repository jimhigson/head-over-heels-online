import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "blacktooth",
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
    extraBall: {
      config: {},
      isExtra: true,
      position: { x: 4, y: 0, z: 0 },
      type: "ball",
    },
    extraBall2: {
      config: {},
      isExtra: true,
      position: { x: 7, y: 2, z: 0 },
      type: "ball",
    },
    extraMonster: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "left",
        style: "starsAndStripes",
        which: "skiHead",
      },
      isExtra: true,
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
      isExtra: true,
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
      isExtra: true,
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
      isExtra: true,
      position: { x: 7, y: 1, z: 0 },
      type: "monster",
    },
    mosnterSwitch: {
      config: {
        initialSetting: "left",
        modifies: [
          {
            expectType: "monster",
            newState: {
              activated: { left: true, right: false },
              everActivated: { left: true },
            },
            targets: [
              "extraMonster",
              "extraMonster2",
              "extraMonster3",
              "extraMonster4",
            ],
          },
        ],
        type: "in-room",
      },
      position: { x: 4, y: 3, z: 2 },
      type: "switch",
    },
    raisedPlatform: {
      config: { style: "artificial", times: { x: 2, y: 4 } },
      isExtra: true,
      position: { x: 4, y: 2, z: 1 },
      type: "block",
    },
    raisedPlatformSupport: {
      config: { style: "tower", times: { x: 2 } },
      isExtra: true,
      position: { x: 4, y: 2, z: 0 },
      type: "block",
    },
    raisedPlatformSupport2: {
      config: { style: "tower", times: { x: 2 } },
      isExtra: true,
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield", "shield", "plain"],
        times: { x: 4 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: { direction: "away", tiles: ["plain", "plain"], times: { x: 4 } },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "plain", "shield", "shield", "plain", "plain"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
