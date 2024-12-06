import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "dimmed" },
  floor: "market",
  floorSkip: [],
  id: "blacktooth50market",
  items: {
    "baddie@0,0,0:ZVblgD": {
      config: { activated: true, which: "helicopter-bug" },
      position: { x: 0, y: 0, z: 0 },
      type: "baddie",
    },
    "baddie@4,7,0:zoxNb": {
      config: { activated: true, startDirection: "towards", which: "cyberman" },
      position: { x: 4, y: 7, z: 0 },
      type: "baddie",
    },
    "baddie@7,0,0:ZVblgD": {
      config: { activated: true, which: "helicopter-bug" },
      position: { x: 7, y: 0, z: 0 },
      type: "baddie",
    },
    "door@0,3,0:ZHEhmr": {
      config: { direction: "right", toRoom: "blacktooth49market" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,0:Z1V7ETu": {
      config: { direction: "towards", toRoom: "blacktooth51" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,3,0:RLEqE": {
      config: { direction: "left", toRoom: "blacktooth52market" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "market",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
    ],
    left: [
      "passage",
      "more-fruits",
      "fruits",
      "none",
      "none",
      "more-fruits",
      "fruits",
      "passage",
    ],
  },
} satisfies RoomJson<"market", OriginalCampaignRoomId>;
