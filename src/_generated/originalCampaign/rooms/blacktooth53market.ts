import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "market",
  id: "blacktooth53market",
  items: {
    "deadlyBlock@2,1,0": {
      config: { style: "spikes" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,6,0": {
      config: { style: "spikes" },
      position: { x: 2, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0": {
      config: { style: "spikes" },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0": {
      config: { style: "spikes" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "blacktooth52market" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,8,0": {
      config: { direction: "away", toRoom: "blacktooth54" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    "monster@2,4,0": {
      config: {
        activated: true,
        movement: "towards-when-in-square-xy8",
        which: "helicopterBug",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
  },
  planet: "market",
  size: { x: 6, y: 8 },
  walls: {
    away: ["more-fruits", "fruits", "none", "none", "more-fruits", "fruits"],
    left: [
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
    ],
  },
}) satisfies RoomJson<"market", OriginalCampaignRoomId>;
