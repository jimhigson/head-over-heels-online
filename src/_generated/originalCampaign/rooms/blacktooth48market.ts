import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth48market",
  items: {
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "blacktooth47market" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@2,3,0": {
      config: { direction: "left", toRoom: "blacktooth49market" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "market",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    scroll: {
      config: { gives: "scroll", page: "blacktooth" },
      position: { x: 1, y: 6, z: 0 },
      type: "pickup",
    },
    "wall@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["more-fruits", "fruits"],
        times: { x: 2 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
      config: {
        direction: "left",
        tiles: ["passage", "more-fruits", "fruits"],
        times: { y: 3 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,5,0": {
      config: {
        direction: "left",
        tiles: ["more-fruits", "fruits", "passage"],
        times: { y: 3 },
      },
      position: { x: 2, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
  size: { x: 2, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
