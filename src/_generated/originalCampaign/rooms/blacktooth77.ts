import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth77",
  items: {
    br: {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    br1: {
      config: { axis: "y", disappearing: { on: "touch" } },
      position: { x: 4, y: 0, z: 3 },
      type: "barrier",
    },
    br2: {
      config: { axis: "y", times: { z: 2 } },
      position: { x: 4, y: 0, z: 4 },
      type: "barrier",
    },
    br3: {
      config: { axis: "y", times: { y: 3 } },
      position: { x: 4, y: 1, z: 3 },
      type: "barrier",
    },
    br4: {
      config: { axis: "y", times: { y: 3 } },
      position: { x: 4, y: 1, z: 5 },
      type: "barrier",
    },
    br5: {
      config: { axis: "y", times: { y: 2 } },
      position: { x: 4, y: 2, z: 4 },
      type: "barrier",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth84" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth71" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 4, y: 0, z: 6 },
      type: "portableBlock",
    },
    pu: { config: {}, position: { x: 3, y: 1, z: 0 }, type: "pushableBlock" },
    w: {
      config: { direction: "right" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right" },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    w3: {
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
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["shield"] },
      position: { x: 8, y: 3, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
