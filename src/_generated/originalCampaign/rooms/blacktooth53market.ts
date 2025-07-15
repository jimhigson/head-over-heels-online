import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "blacktooth53market",
  items: {
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
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "market",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@2,4,0": {
      config: {
        activated: "while-player-near",
        movement: "towards-analogue",
        which: "helicopterBug",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    "spikes@2,1,0": {
      config: {},
      position: { x: 2, y: 1, z: 0 },
      type: "spikes",
    },
    "spikes@2,6,0": {
      config: {},
      position: { x: 2, y: 6, z: 0 },
      type: "spikes",
    },
    "spikes@5,3,0": {
      config: { times: { y: 2 } },
      position: { x: 5, y: 3, z: 0 },
      type: "spikes",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["more-fruits", "fruits"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,8,0": {
      config: { direction: "away", tiles: ["more-fruits", "fruits"] },
      position: { x: 4, y: 8, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: [
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
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
  size: { x: 6, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
