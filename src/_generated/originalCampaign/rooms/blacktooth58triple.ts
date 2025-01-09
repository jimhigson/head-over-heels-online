import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "blacktooth58triple",
  items: {
    "block@0,11,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 11, z: 0 },
      type: "block",
    },
    "block@0,13,0": {
      config: { style: "organic" },
      position: { x: 0, y: 13, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@1,13,0": {
      config: { style: "organic" },
      position: { x: 1, y: 13, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@10,0,0": {
      config: { style: "organic" },
      position: { x: 10, y: 0, z: 0 },
      type: "block",
    },
    "block@10,5,0": {
      config: { style: "organic" },
      position: { x: 10, y: 5, z: 0 },
      type: "block",
    },
    "block@11,0,0": {
      config: { style: "organic" },
      position: { x: 11, y: 0, z: 0 },
      type: "block",
    },
    "block@11,5,0": {
      config: { style: "organic" },
      position: { x: 11, y: 5, z: 0 },
      type: "block",
    },
    "block@12,0,0": {
      config: { style: "organic" },
      position: { x: 12, y: 0, z: 0 },
      type: "block",
    },
    "block@12,5,0": {
      config: { style: "organic" },
      position: { x: 12, y: 5, z: 0 },
      type: "block",
    },
    "block@13,0,0": {
      config: { style: "organic" },
      position: { x: 13, y: 0, z: 0 },
      type: "block",
    },
    "block@13,3,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 13, y: 3, z: 0 },
      type: "block",
    },
    "block@13,5,0": {
      config: { style: "organic" },
      position: { x: 13, y: 5, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,13,0": {
      config: { style: "organic" },
      position: { x: 2, y: 13, z: 0 },
      type: "block",
    },
    "block@2,7,0": {
      config: { style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,13,0": {
      config: { style: "organic" },
      position: { x: 3, y: 13, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,13,0": {
      config: { style: "organic" },
      position: { x: 4, y: 13, z: 0 },
      type: "block",
    },
    "block@4,7,0": {
      config: { style: "organic" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@5,0,0": {
      config: { style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,13,0": {
      config: { style: "organic" },
      position: { x: 5, y: 13, z: 0 },
      type: "block",
    },
    "block@5,7,0": {
      config: { style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "block@6,0,0": {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@8,0,0": {
      config: { style: "organic" },
      position: { x: 8, y: 0, z: 0 },
      type: "block",
    },
    "block@8,5,0": {
      config: { style: "organic" },
      position: { x: 8, y: 5, z: 0 },
      type: "block",
    },
    "block@9,0,0": {
      config: { style: "organic" },
      position: { x: 9, y: 0, z: 0 },
      type: "block",
    },
    "block@9,5,0": {
      config: { style: "organic" },
      position: { x: 9, y: 5, z: 0 },
      type: "block",
    },
    "conveyor@5,5,0": {
      config: { direction: "away" },
      position: { x: 5, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,6,0": {
      config: { direction: "away" },
      position: { x: 5, y: 6, z: 0 },
      type: "conveyor",
    },
    "conveyor@6,5,0": {
      config: { direction: "left" },
      position: { x: 6, y: 5, z: 0 },
      type: "conveyor",
    },
    "deadlyBlock@0,9,0": {
      config: { style: "spikes" },
      position: { x: 0, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,9,1": {
      config: { style: "spikes" },
      position: { x: 0, y: 9, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,8,0": {
      config: { style: "spikes" },
      position: { x: 4, y: 8, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,9,0": {
      config: { style: "spikes" },
      position: { x: 4, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,1,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,4,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth57" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "door@2,14,2": {
      config: { direction: "away", toRoom: "blacktooth59" },
      position: { x: 2, y: 14, z: 2 },
      type: "door",
    },
    "monster@4,9,1": {
      config: {
        activated: true,
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 4, y: 9, z: 1 },
      type: "monster",
    },
    "monster@7,3,1": {
      config: {
        activated: true,
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 7, y: 3, z: 1 },
      type: "monster",
    },
    "pickup@13,5,1": {
      config: { gives: "fast" },
      position: { x: 13, y: 5, z: 1 },
      type: "pickup",
    },
    "wall@10,6,0": {
      config: { side: "away", style: "bars" },
      position: { x: 10, y: 6, z: 0 },
      type: "wall",
    },
    "wall@11,6,0": {
      config: { side: "away", style: "bars" },
      position: { x: 11, y: 6, z: 0 },
      type: "wall",
    },
    "wall@12,6,0": {
      config: { side: "away", style: "bars" },
      position: { x: 12, y: 6, z: 0 },
      type: "wall",
    },
    "wall@13,6,0": {
      config: { side: "away", style: "bars" },
      position: { x: 13, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,10,0": {
      config: { side: "left", style: "bars" },
      position: { x: 6, y: 10, z: 0 },
      type: "wall",
    },
    "wall@6,11,0": {
      config: { side: "left", style: "bars" },
      position: { x: 6, y: 11, z: 0 },
      type: "wall",
    },
    "wall@6,12,0": {
      config: { side: "left", style: "bars" },
      position: { x: 6, y: 12, z: 0 },
      type: "wall",
    },
    "wall@6,13,0": {
      config: { side: "left", style: "bars" },
      position: { x: 6, y: 13, z: 0 },
      type: "wall",
    },
    "wall@6,6,0:Z2rXegQ": {
      config: { side: "away", style: "bars" },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,6,0:ZfQXkd": {
      config: { side: "left", style: "bars" },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,7,0": {
      config: { side: "left", style: "bars" },
      position: { x: 6, y: 7, z: 0 },
      type: "wall",
    },
    "wall@6,8,0": {
      config: { side: "left", style: "bars" },
      position: { x: 6, y: 8, z: 0 },
      type: "wall",
    },
    "wall@6,9,0": {
      config: { side: "left", style: "bars" },
      position: { x: 6, y: 9, z: 0 },
      type: "wall",
    },
    "wall@7,6,0": {
      config: { side: "away", style: "bars" },
      position: { x: 7, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,6,0": {
      config: { side: "away", style: "bars" },
      position: { x: 8, y: 6, z: 0 },
      type: "wall",
    },
    "wall@9,6,0": {
      config: { side: "away", style: "bars" },
      position: { x: 9, y: 6, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  size: { x: 14, y: 14 },
  walls: {
    away: [
      "bars",
      "bars",
      "none",
      "none",
      "bars",
      "bars",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
    left: [
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
