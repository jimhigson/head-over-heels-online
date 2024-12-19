import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "blacktooth",
  id: "blacktooth36",
  items: {
    "door@0,2,0:uMIUW": {
      config: { direction: "right", toRoom: "blacktooth35" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,6,0:xRwHb": {
      config: { direction: "away", toRoom: "blacktooth37" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## SWITCHES

![](switch.left)

Simply push the switch to switch things off and on!  
**WARNING**: Switching a deadly monster off will stop him moving but he will
still be deadly to touch.

*Head Over Heels Manual*
`,
      },
      position: { x: 4, y: 5, z: 0 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 6 },
  walls: {
    away: ["plain", "shield", "none", "none", "shield", "plain"],
    left: ["plain", "armour", "shield", "shield", "armour", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
