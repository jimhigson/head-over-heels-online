import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "deadly",
  id: "blacktooth9",
  items: {
    "block@0,4,0": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,4,1": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 1 },
      type: "block",
    },
    "block@0,4,2": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 2 },
      type: "block",
    },
    "block@3,4,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@3,4,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 4, z: 1 },
      type: "block",
    },
    "block@3,4,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 4, z: 2 },
      type: "block",
    },
    "block@3,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    "block@3,7,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 7, z: 2 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,2,0": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,4,0": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "block@7,5,0": {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "block@7,6,0": {
      config: { style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    "block@7,7,0": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "block@7,7,1": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    "block@7,7,2": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 2 },
      type: "block",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "blacktooth8fish" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "pickup@0,4,7": {
      config: { gives: "hooter" },
      position: { x: 0, y: 4, z: 7 },
      type: "pickup",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## HOOTER

![](hooter)
The hooter may be used by Head to fire doughnuts at attacking monsters. This
will freeze them in place as they lick the doughnut off their faces. The hooter
may only be used by Head and requires a tray of doughnuts to be of any use.

**> Head Over Heels Manual**
`,
      },
      position: { x: 7, y: 1, z: 1 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
