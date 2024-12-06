import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "market",
  floorSkip: [],
  id: "blacktooth55",
  items: {
    "door@0,2,0:uN0cs": {
      config: { direction: "right", toRoom: "blacktooth56" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,0:xRTaM": {
      config: { direction: "away", toRoom: "blacktooth61" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    "lift@3,0,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 3, y: 0, z: 0 },
      type: "lift",
    },
    "scroll": {
      type: "scroll",
      position: { x: 5, y: 5, z: 0 },
      config: {
        text: `
## HUSH PUPPIES

These are a very strange type of beast; they are incredibly sleepy. In fact,
they never wake up and it is quite normal for them to sleep for their entire
lives. They are often used as tables and even used as building bricks. They are
a native of Freedom, and for many thousands of years Head and his ancestors have
been mistaking them for Heels and causing so much trouble to the poor old hush
puppies that they evolved a defense mechanism: they somehow learned to teleport
themselves away. Nobody knows where they go, but the instant they see any of
Head's race, they disappear and won't return until they are sure the coast is
clear.

Source: Head Over Heels Manual
`, sprites: ["hushPuppy"]
      }
    },
  },
  planet: "jail",
  roomAbove: "blacktooth54",
  size: { x: 8, y: 6 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
} satisfies RoomJson<"jail", OriginalCampaignRoomId>;
