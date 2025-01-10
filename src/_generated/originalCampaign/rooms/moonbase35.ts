import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "moonbase",
  id: "moonbase35",
  items: {
    "deadlyBlock@0,1,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,2,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,3,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
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
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "moonbase34" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "monster@0,1,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 1, z: 1 },
      type: "monster",
    },
    "monster@0,2,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 2, z: 1 },
      type: "monster",
    },
    "monster@0,3,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 3, z: 1 },
      type: "monster",
    },
    "monster@0,4,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 4, z: 1 },
      type: "monster",
    },
    "monster@5,1,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 1, z: 1 },
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
    "teleporter@2,2,0": {
      config: { toPosition: { x: 2, y: 3, z: 0 }, toRoom: "blacktooth51" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,3,0": {
      config: { toPosition: { x: 2, y: 4, z: 0 }, toRoom: "blacktooth51" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,2,0": {
      config: { toPosition: { x: 3, y: 3, z: 0 }, toRoom: "blacktooth51" },
      position: { x: 3, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0": {
      config: { toPosition: { x: 3, y: 4, z: 0 }, toRoom: "blacktooth51" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
  walls: {
    away: ["window1", "coil", "window3", "window2", "coil", "window1"],
    left: ["window1", "coil", "window3", "window2", "coil", "window1"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
