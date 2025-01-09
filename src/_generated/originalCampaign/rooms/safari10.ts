import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "safari",
  id: "safari10",
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
    "door@8,2,0": {
      config: { direction: "left", toRoom: "safari11" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    "spring@0,5,0": {
      config: {},
      position: { x: 0, y: 5, z: 0 },
      type: "spring",
    },
  },
  planet: "safari",
  roomAbove: "safari9",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: ["wall", "shield", "none", "none", "shield", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
