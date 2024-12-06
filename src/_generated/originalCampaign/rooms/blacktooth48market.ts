import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "magenta", shade: "basic" },
  floor: "market",
  floorSkip: [],
  id: "blacktooth48market",
  items: {
    "door@0,0,0:Z1wlAU5": {
      config: { direction: "towards", toRoom: "blacktooth47market" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@2,3,0:1nLHW6": {
      config: { direction: "left", toRoom: "blacktooth49market" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    "scroll": {
      type: "scroll",
      position: { x: 1, y: 6, z: 0 },
      config: {
        text: `
### BLACKTOOTH

This planet has a large moon with three lunar space stations on it, the larger
of these, Moon Station HQ, is the main teleport center for the empire, with a
direct teleport to all the slave planets. Sometime after the Egyptus episode,
the latest Emperor sent out a craft to find that same strange planet, and after
much exploration, it was finally located, and the craft landed. However, the
crew found the people had changed: instead of pyramids they used castles,
instead of wrapping corpses up in cloth, they wrapped living men in metal and
then tried to turn them into corpses with sharp metal sticks.

The Emperor, not to be outdone by his ancestor, built a castle on Blacktooth and
used it as his headquarters. The castle is surrounded by a small market, and
then a range of impassable mountains. The only way to leave is via teleport to
one of the three lunar space stations.

Source: Head Over Heels Manual
`, sprites: ["ball"]
      }
    },
  },
  planet: "market",
  size: { x: 2, y: 8 },
  walls: {
    away: ["more-fruits", "fruits"],
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
