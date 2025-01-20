import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "none",
  id: "blacktooth34",
  items: {
    "block@3,7,0": {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@5,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "door@3,8,2": {
      config: { direction: "away", toRoom: "blacktooth35" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    "lift@7,7,0": {
      config: { bottom: 0, top: 6 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## SPRINGS

![](texture-spring.compressed)

Jumping from a spring will give extra height to your jump.

**> head over heels manual**
`,
      },
      position: { x: 2, y: 7, z: 1 },
      type: "pickup",
    },
    scrollBlock: {
      config: { style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth33",
  size: { x: 8, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
