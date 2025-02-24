import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "market",
  id: "blacktooth55",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth56" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,0": {
      config: { direction: "away", toRoom: "blacktooth61" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    "lift@3,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 3, y: 0, z: 0 },
      type: "lift",
    },
    scroll: {
      config: { gives: "scroll", page: "hushPuppies" },
      position: { x: 5, y: 5, z: 0 },
      type: "pickup",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars"],
        times: { x: 3 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,6,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars"],
        times: { x: 3 },
      },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  roomAbove: "blacktooth54",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
