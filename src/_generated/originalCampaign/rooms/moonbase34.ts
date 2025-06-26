import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "moonbase34",
  items: {
    "deadlyBlock@7,0,0": {
      config: { style: "toaster", times: { y: 4 } },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,1,0": {
      config: {
        direction: "right",
        meta: { toSubRoom: "middle" },
        toRoom: "moonbase33triple",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@3,4,0": {
      config: { direction: "away", toRoom: "moonbase35" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@7,0,1": {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 0, z: 1 },
      type: "monster",
    },
    "monster@7,1,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 1, z: 1 },
      type: "monster",
    },
    "monster@7,2,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 2, z: 1 },
      type: "monster",
    },
    "monster@7,3,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: { x: 7, y: 3, z: 1 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,3,0": {
      config: { direction: "right" },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "away", tiles: ["window3", "coil", "window2"] },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@5,4,0": {
      config: { direction: "away", tiles: ["window2", "coil", "window1"] },
      position: { x: 5, y: 4, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["window2", "window3", "window1", "coil"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 4 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
