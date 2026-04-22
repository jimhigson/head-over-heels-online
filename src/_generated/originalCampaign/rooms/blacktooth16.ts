import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth16",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth15" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: {
        direction: "left",
        meta: { toSubRoom: "middle" },
        toRoom: "blacktooth17triple",
      },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 0, y: 7, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 7, y: 0, z: 0 },
      type: "monster",
    },
    m2: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 7, y: 7, z: 0 },
      type: "monster",
    },
    sd: {
      config: { startingPhase: 1, style: "spikyBall" },
      position: { x: 2, y: 3, z: 0 },
      type: "slidingDeadly",
    },
    sd1: {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 5, y: 4, z: 0 },
      type: "slidingDeadly",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
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
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
