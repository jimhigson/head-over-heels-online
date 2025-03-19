import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
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
    scroll: {
      config: { gives: "scroll", page: "teleportBack" },
      position: { x: 0, y: 0, z: 10 },
      type: "pickup",
    },
    "teleporter@7,3,0": {
      config: {
        times: { y: 2 },
        toPosition: { x: 7, y: 3, z: 0 },
        toRoom: "bookworld1",
        activatedOnStoreValue: "planetsLiberated.bookworld",
      },
      position: { x: 7, y: 3, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
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
        times: { x: 8 },
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
        times: { y: 8 },
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
