import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth28",
  items: {
    "block@5,0,0": {
      config: { style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,1,0": {
      config: { style: "organic" },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    "block@5,2,0": {
      config: { style: "organic" },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    "block@6,0,0": {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,1,0": {
      config: { style: "organic" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,2,0": {
      config: { style: "organic" },
      position: { x: 6, y: 2, z: 0 },
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
    "charles@3,4,0": {
      config: {},
      position: { x: 3, y: 4, z: 0 },
      type: "charles",
    },
    "conveyor@0,7,2": {
      config: { direction: "right" },
      position: { x: 0, y: 7, z: 2 },
      type: "conveyor",
    },
    "conveyor@1,7,2": {
      config: { direction: "right" },
      position: { x: 1, y: 7, z: 2 },
      type: "conveyor",
    },
    "conveyor@2,7,2": {
      config: { direction: "right" },
      position: { x: 2, y: 7, z: 2 },
      type: "conveyor",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "blacktooth27fish" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "joystick@6,1,1": {
      config: { controls: ["charles@3,4,0"] },
      position: { x: 6, y: 1, z: 1 },
      type: "joystick",
    },
    "pickup@2,7,7": {
      config: { gives: "bag" },
      position: { x: 2, y: 7, z: 7 },
      type: "pickup",
    },
    "portableBlock@1,7,0": {
      config: { style: "cube" },
      position: { x: 1, y: 7, z: 0 },
      type: "portableBlock",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## BAG

![](texture-bag)The bag may be used to carry small objects around a room. It is essential for
Heels to find and get the bag as it is impossible to get far without it. The
object in the bag will be displayed immediately above the bag’s icon at the
bottom right of the screen. To pick up an object just stand on top of it and
press the CARRY key. It is not possible to drop an object in a doorway.

![](texture-cube)![](texture-drum)![](texture-spring.compressed)![](texture-sticks)

**> head over heels manual**
`,
      },
      position: { x: 4, y: 0, z: 1 },
      type: "pickup",
    },
    scrollBlock: {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
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
