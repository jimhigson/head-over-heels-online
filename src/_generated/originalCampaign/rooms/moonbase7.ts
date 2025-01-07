import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "moonbase",
  id: "moonbase7",
  items: {
    "block@2,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,0,1": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 1 },
      type: "block",
    },
    "block@2,0,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 3 },
      type: "block",
    },
    "block@3,0,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,7,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,7,0": {
      config: { style: "toaster" },
      position: { x: 1, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,7,0": {
      config: { style: "toaster" },
      position: { x: 2, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,7,0": {
      config: { style: "toaster" },
      position: { x: 5, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,7,0": {
      config: { style: "toaster" },
      position: { x: 6, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,7,0": {
      config: { style: "toaster" },
      position: { x: 7, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "moonbase8" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "moonbase6" },
      position: { x: 3, y: 0, z: 4 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "moonbase15" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "monster@0,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    "monster@1,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 1, y: 7, z: 1 },
      type: "monster",
    },
    "monster@2,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 2, y: 7, z: 1 },
      type: "monster",
    },
    "monster@5,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 5, y: 7, z: 1 },
      type: "monster",
    },
    "monster@6,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "monster",
    },
    "monster@7,7,1": {
      config: {
        activated: false,
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        wakes: false,
        which: "cyberman",
      },
      position: { x: 7, y: 7, z: 1 },
      type: "monster",
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
