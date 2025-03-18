import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth14",
  items: {
    "barrier@4,0,0": {
      config: { axis: "y", times: { y: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@4,0,1": {
      config: { axis: "y", times: { z: 2 } },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    "barrier@4,1,1": {
      config: { axis: "y", disappearing: "onTouch" },
      position: { x: 4, y: 1, z: 1 },
      type: "barrier",
    },
    "barrier@4,1,2": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 2 },
      type: "barrier",
    },
    "barrier@4,2,0": {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 4, y: 2, z: 0 },
      type: "barrier",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth13" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "monster@7,2,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 7, y: 2, z: 0 },
      type: "monster",
    },
    "pickup@7,1,0": {
      config: { gives: "doughnuts" },
      position: { x: 7, y: 1, z: 0 },
      type: "pickup",
    },
    "pickup@7,4,0": {
      config: { gives: "fast" },
      position: { x: 7, y: 4, z: 0 },
      type: "pickup",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
