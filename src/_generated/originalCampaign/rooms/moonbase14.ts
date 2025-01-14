import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "moonbase",
  id: "moonbase14",
  items: {
    "deadlyBlock@5,2,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "moonbase15" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "moonbase13" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "monster@2,7,0": {
      config: {
        activated: true,
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 2, y: 7, z: 0 },
      type: "monster",
    },
    "monster@5,2,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 2, z: 1 },
      type: "monster",
    },
    "monster@5,3,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 3, z: 1 },
      type: "monster",
    },
    "monster@5,4,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 4, z: 1 },
      type: "monster",
    },
    "monster@5,5,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 5, z: 1 },
      type: "monster",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 8 },
  walls: {
    away: ["window1", "coil", "window2", "window3", "coil", "window1"],
    left: [
      "window3",
      "window1",
      "coil",
      "window2",
      "window3",
      "coil",
      "window3",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
