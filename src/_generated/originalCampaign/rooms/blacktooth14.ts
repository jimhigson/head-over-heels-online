import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth14",
  items: {
    br: {
      config: { axis: "y", times: { y: 6 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    br1: {
      config: { axis: "y", times: { z: 2 } },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    br2: {
      config: { axis: "y", disappearing: { on: "touch" } },
      position: { x: 4, y: 1, z: 1 },
      type: "barrier",
    },
    br3: {
      config: { axis: "y", times: { y: 5 } },
      position: { x: 4, y: 1, z: 2 },
      type: "barrier",
    },
    br4: {
      config: { axis: "y", times: { y: 4 } },
      position: { x: 4, y: 2, z: 1 },
      type: "barrier",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth13" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 7, y: 2, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "doughnuts" },
      position: { x: 7, y: 1, z: 0 },
      type: "pickup",
    },
    pi1: {
      config: { gives: "fast" },
      position: { x: 7, y: 4, z: 0 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
