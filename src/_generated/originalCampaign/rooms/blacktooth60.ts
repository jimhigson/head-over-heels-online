import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "bookworld",
  id: "blacktooth60",
  items: {
    "barrier@0,3,0": {
      config: { axis: "x", times: { x: 3, z: 3 } },
      position: { x: 0, y: 3.4, z: 0 },
      type: "barrier",
    },
    "barrier@3,4,0": {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 2.6, y: 4, z: 0 },
      type: "barrier",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth59" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "pickup@0,4,0": {
      config: { gives: "extra-life" },
      position: { x: 0, y: 4, z: 0 },
      type: "pickup",
    },
    "teleporter@0,6,0": {
      config: {
        times: { x: 2, y: 2 },
        toPosition: { x: 0, y: 6, z: 0 },
        toRoom: "moonbase8",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,6,0": {
      config: {
        times: { x: 2, y: 2 },
        toPosition: { x: 6, y: 6, z: 0 },
        toRoom: "moonbase8",
      },
      position: { x: 6, y: 6, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: 4, y: 4, z: 0 },
      with: { room: "moonbase8" },
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
