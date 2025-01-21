import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth2",
  items: {
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "blacktooth3" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    extra: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 1, z: 0 },
      type: "movableBlock",
    },
    extra2: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 4, z: 0 },
      type: "movableBlock",
    },
    extra3: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 3.5, z: 1 },
      type: "movableBlock",
    },
    extra4: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 1.5, z: 1 },
      type: "movableBlock",
    },
    extra5: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 2, z: 2 },
      type: "movableBlock",
    },
    extra6: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 3, z: 2 },
      type: "movableBlock",
    },
    extra7: {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 2.5, z: 3 },
      type: "movableBlock",
    },
    scroll: {
      config: {
        gives: "scroll",
        page: "historyOfTheBlacktoothEmpire",
      },
      position: { x: 1, y: 2.5, z: 4 },
      type: "pickup",
    },
    "teleporter@5,7,0": {
      config: { toPosition: { x: 5, y: 7, z: 0 }, toRoom: "blacktooth1head" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 8 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
