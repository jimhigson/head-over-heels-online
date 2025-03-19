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
      config: { style: "stepStool" },
      isExtra: true,
      position: { x: 1, y: 1, z: 0 },
      type: "pushableBlock",
    },
    extra2: {
      config: { style: "stepStool" },
      isExtra: true,
      position: { x: 1, y: 4, z: 0 },
      type: "pushableBlock",
    },
    extra3: {
      config: { style: "stepStool" },
      isExtra: true,
      position: { x: 1, y: 3.5, z: 1 },
      type: "pushableBlock",
    },
    extra4: {
      config: { style: "stepStool" },
      isExtra: true,
      position: { x: 1, y: 1.5, z: 1 },
      type: "pushableBlock",
    },
    extra5: {
      config: { style: "stepStool" },
      isExtra: true,
      position: { x: 1, y: 2, z: 2 },
      type: "pushableBlock",
    },
    extra6: {
      config: { style: "stepStool" },
      isExtra: true,
      position: { x: 1, y: 3, z: 2 },
      type: "pushableBlock",
    },
    extra7: {
      config: { style: "stepStool" },
      isExtra: true,
      position: { x: 1, y: 2.5, z: 3 },
      type: "pushableBlock",
    },
    scroll: {
      config: { gives: "scroll", page: "historyOfTheBlacktoothEmpire" },
      isExtra: true,
      position: { x: 1, y: 2.5, z: 4 },
      type: "pickup",
    },
    "teleporter@5,7,0": {
      config: { toPosition: { x: 5, y: 7, z: 0 }, toRoom: "blacktooth1head" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
        times: { x: 6 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
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
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
