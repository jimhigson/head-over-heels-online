import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth48market",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth47market" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth49market" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "market",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "scroll", page: "blacktooth", source: "manual" },
      position: { x: 1, y: 6, z: 0 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "away", tiles: ["more-fruits", "fruits"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "left",
        tiles: ["passage", "more-fruits", "fruits"],
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
        tiles: ["more-fruits", "fruits", "passage"],
      },
      position: { x: 2, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
