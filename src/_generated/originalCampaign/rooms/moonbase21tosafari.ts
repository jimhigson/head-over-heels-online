import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase21tosafari",
  items: {
    "deadlyBlock@0,7,0": {
      config: { style: "toaster", times: { x: 6 } },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "moonbase20" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "monster@0,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    "monster@1,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 1, y: 7, z: 1 },
      type: "monster",
    },
    "monster@2,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 2, y: 7, z: 1 },
      type: "monster",
    },
    "monster@3,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 3, y: 7, z: 1 },
      type: "monster",
    },
    "monster@4,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 4, y: 7, z: 1 },
      type: "monster",
    },
    "monster@5,7,1": {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 5, y: 7, z: 1 },
      type: "monster",
    },
    scroll: {
      config: { gives: "scroll", page: "safari" },
      position: { x: 1, y: 3, z: 0 },
      type: "pickup",
    },
    "teleporter@2,3,0": {
      config: {
        times: { x: 2, y: 2 },
        toPosition: { x: 2, y: 3, z: 0 },
        toRoom: "safari1",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
        times: { x: 6 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
        times: { y: 8 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    label: { align: "left", gridOffset: { x: 0, y: 0.75 }, text: "Safari" },
  },
  planet: "moonbase",
  size: { x: 6, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
