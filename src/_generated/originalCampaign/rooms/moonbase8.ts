import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "moonbase",
  id: "moonbase8",
  items: {
    "baddie@0,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@1,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 1, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@2,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 2, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@5,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@6,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 6, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@7,0,1:ZfJWcr": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 7, y: 0, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@0,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 6, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@8,3,0:Z2smAfq": {
      config: { direction: "left", toRoom: "moonbase7" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "teleporter@0,6,0:Z1GpKOp": {
      config: { toRoom: "blacktooth60" },
      position: { x: 0, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@0,7,0:Z1GpKOp": {
      config: { toRoom: "blacktooth60" },
      position: { x: 0, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,6,0:Z1GpKOp": {
      config: { toRoom: "blacktooth60" },
      position: { x: 1, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,7,0:Z1GpKOp": {
      config: { toRoom: "blacktooth60" },
      position: { x: 1, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,6,0:Z1GpKOp": {
      config: { toRoom: "blacktooth60" },
      position: { x: 6, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,7,0:Z1GpKOp": {
      config: { toRoom: "blacktooth60" },
      position: { x: 6, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,6,0:Z1GpKOp": {
      config: { toRoom: "blacktooth60" },
      position: { x: 7, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,7,0:Z1GpKOp": {
      config: { toRoom: "blacktooth60" },
      position: { x: 7, y: 7, z: 0 },
      type: "teleporter",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
    left: [
      "window2",
      "coil",
      "window3",
      "none",
      "none",
      "window3",
      "coil",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
