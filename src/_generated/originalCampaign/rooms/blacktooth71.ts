import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth71",
  items: {
    "block@0,2,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    "block@0,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "deadlyBlock@2,0,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,4,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,5,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,3,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,4": {
      config: { direction: "right", toRoom: "blacktooth77" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth70" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,6,0": {
      config: { direction: "away", toRoom: "blacktooth72" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    "monster@2,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "monster",
    },
    "portableBlock@0,5,0": {
      config: { style: "cube" },
      position: { x: 0, y: 5, z: 0 },
      type: "portableBlock",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## THE EMPEROR'S GUARDIAN

![](ball) The guardian blocks the door to the throne room in Blacktooth castle. He is very
dangerous, and he doesn't like doughnuts. Only a true hero may pass the
guardian.

*> head over heels manual*
`,
      },
      position: { x: 7, y: 3, z: 0 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
    left: ["plain", "armour", "shield", "shield", "armour", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
