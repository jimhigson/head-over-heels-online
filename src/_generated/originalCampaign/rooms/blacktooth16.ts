import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth16",
  items: {
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth15" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth17triple" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "monster@0,7,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 0, y: 7, z: 0 },
      type: "monster",
    },
    "monster@7,0,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 7, y: 0, z: 0 },
      type: "monster",
    },
    "monster@7,7,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 7, y: 7, z: 0 },
      type: "monster",
    },
    "slidingDeadly@3,3,0": {
      config: { style: "puck" },
      position: { x: 3, y: 3, z: 0 },
      type: "slidingDeadly",
    },
    "slidingDeadly@4,4,0": {
      config: { style: "puck" },
      position: { x: 4, y: 4, z: 0 },
      type: "slidingDeadly",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
