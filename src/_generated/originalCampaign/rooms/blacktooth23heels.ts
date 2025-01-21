import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "jail",
  id: "blacktooth23heels",
  items: {
    "barrier@4,0,0": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@4,0,1": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    "barrier@4,0,2": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@4,1,0": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 0 },
      type: "barrier",
    },
    "barrier@4,1,1": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 1 },
      type: "barrier",
    },
    "barrier@4,1,2": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 2 },
      type: "barrier",
    },
    "barrier@4,2,0": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 0 },
      type: "barrier",
    },
    "barrier@4,2,1": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 1 },
      type: "barrier",
    },
    "barrier@4,2,2": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 2 },
      type: "barrier",
    },
    "barrier@4,3,0": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@4,3,1": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 1 },
      type: "barrier",
    },
    "barrier@4,3,2": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@4,4,0": {
      config: { axis: "y" },
      position: { x: 4, y: 4, z: 0 },
      type: "barrier",
    },
    "barrier@4,4,1": {
      config: { axis: "y" },
      position: { x: 4, y: 4, z: 1 },
      type: "barrier",
    },
    "barrier@4,4,2": {
      config: { axis: "y" },
      position: { x: 4, y: 4, z: 2 },
      type: "barrier",
    },
    "barrier@4,5,0": {
      config: { axis: "y" },
      position: { x: 4, y: 5, z: 0 },
      type: "barrier",
    },
    "barrier@4,5,1": {
      config: { axis: "y" },
      position: { x: 4, y: 5, z: 1 },
      type: "barrier",
    },
    "barrier@4,5,2": {
      config: { axis: "y" },
      position: { x: 4, y: 5, z: 2 },
      type: "barrier",
    },
    "barrier@4,6,0": {
      config: { axis: "y" },
      position: { x: 4, y: 6, z: 0 },
      type: "barrier",
    },
    "barrier@4,6,1": {
      config: { axis: "y" },
      position: { x: 4, y: 6, z: 1 },
      type: "barrier",
    },
    "barrier@4,6,2": {
      config: { axis: "y" },
      position: { x: 4, y: 6, z: 2 },
      type: "barrier",
    },
    "barrier@4,7,0": {
      config: { axis: "y" },
      position: { x: 4, y: 7, z: 0 },
      type: "barrier",
    },
    "barrier@4,7,1": {
      config: { axis: "y" },
      position: { x: 4, y: 7, z: 1 },
      type: "barrier",
    },
    "barrier@4,7,2": {
      config: { axis: "y" },
      position: { x: 4, y: 7, z: 2 },
      type: "barrier",
    },
    "conveyor@0,1,0": {
      config: { direction: "away" },
      position: { x: 0, y: 1, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,2,0": {
      config: { direction: "away" },
      position: { x: 0, y: 2, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,3,0": {
      config: { direction: "away" },
      position: { x: 0, y: 3, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,4,0": {
      config: { direction: "away" },
      position: { x: 0, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,5,0": {
      config: { direction: "away" },
      position: { x: 0, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,6,0": {
      config: { direction: "away" },
      position: { x: 0, y: 6, z: 0 },
      type: "conveyor",
    },
    "deadlyBlock@0,7,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth1head" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    extra1: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 3, z: 0 },
      type: "movableBlock",
    },
    extra2: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 4, z: 0 },
      type: "movableBlock",
    },
    extra3: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 3, z: 1 },
      type: "movableBlock",
    },
    heels: {
      config: { which: "heels" },
      position: { x: 3.5, y: 3.5, z: 0 },
      type: "player",
    },
    scroll: {
      config: {
        gives: "scroll",
        page: "head",
      },
      position: { x: 7, y: 1, z: 0 },
      type: "pickup",
    },
    scroll2: {
      config: {
        gives: "scroll",
        page: "heels",
      },
      position: { x: 3, y: 7, z: 0 },
      type: "pickup",
    },
    "teleporter@0,0,0": {
      config: { toPosition: { x: 0, y: 0, z: 0 }, toRoom: "blacktooth24" },
      position: { x: 0, y: 0, z: 0 },
      type: "teleporter",
    },
  },
  planet: "jail",
  size: { x: 8, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
