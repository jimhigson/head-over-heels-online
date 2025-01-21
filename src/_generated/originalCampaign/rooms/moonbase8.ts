import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "moonbase",
  id: "moonbase8",
  items: {
    "deadlyBlock@0,0,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0": {
      config: { style: "toaster" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0": {
      config: { style: "toaster" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,0,0": {
      config: { style: "toaster" },
      position: { x: 6, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,0": {
      config: { style: "toaster" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "moonbase7" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "monster@0,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 0, z: 1 },
      type: "monster",
    },
    "monster@1,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 1, y: 0, z: 1 },
      type: "monster",
    },
    "monster@2,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 2, y: 0, z: 1 },
      type: "monster",
    },
    "monster@5,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 0, z: 1 },
      type: "monster",
    },
    "monster@6,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 6, y: 0, z: 1 },
      type: "monster",
    },
    "monster@7,0,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 7, y: 0, z: 1 },
      type: "monster",
    },
    "teleporter@0,6,0": {
      config: { toPosition: { x: 0, y: 6, z: 0 }, toRoom: "blacktooth60" },
      position: { x: 0, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@0,7,0": {
      config: { toPosition: { x: 0, y: 7, z: 0 }, toRoom: "blacktooth60" },
      position: { x: 0, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,6,0": {
      config: { toPosition: { x: 1, y: 6, z: 0 }, toRoom: "blacktooth60" },
      position: { x: 1, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,7,0": {
      config: { toPosition: { x: 1, y: 7, z: 0 }, toRoom: "blacktooth60" },
      position: { x: 1, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,6,0": {
      config: { toPosition: { x: 6, y: 6, z: 0 }, toRoom: "blacktooth60" },
      position: { x: 6, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,7,0": {
      config: { toPosition: { x: 6, y: 7, z: 0 }, toRoom: "blacktooth60" },
      position: { x: 6, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,6,0": {
      config: { toPosition: { x: 7, y: 6, z: 0 }, toRoom: "blacktooth60" },
      position: { x: 7, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,7,0": {
      config: { toPosition: { x: 7, y: 7, z: 0 }, toRoom: "blacktooth60" },
      position: { x: 7, y: 7, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window3",
      "window1",
      "coil",
      "window2",
      "window3",
      "coil",
      "window3",
      "window1",
    ],
    left: [
      "window3",
      "coil",
      "window2",
      "none",
      "none",
      "window2",
      "coil",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
