import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "bookworld39",
  items: {
    "conveyor@0,0,0": {
      config: { direction: "left", times: { x: 7 } },
      position: { x: 0, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@7,0,0": {
      config: { direction: "away", times: { y: 2 } },
      position: { x: 7, y: 0, z: 0 },
      type: "conveyor",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    scroll: {
      config: { gives: "scroll", page: "teleportBack" },
      position: { x: 0, y: 0, z: 10 },
      type: "pickup",
    },
    "teleporter@7,3,0": {
      config: {
        activatedOnStoreValue: "planetsLiberated.bookworld",
        times: { y: 2 },
        toPosition: { x: 7, y: 3, z: 0 },
        toRoom: "bookworld1",
      },
      position: { x: 7, y: 3, z: 0 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  roomAbove: "bookworld38",
  roomBelow: "bookworld40",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
