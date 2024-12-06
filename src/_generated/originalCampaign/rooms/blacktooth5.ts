import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "magenta", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth5",
  items: {
    "deadlyBlock@0,2,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,2,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,0,0:Z1cQaKM": {
      config: { direction: "towards", toRoom: "blacktooth7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0:29aKb8": {
      config: { direction: "away", toRoom: "blacktooth4" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "door@2,3,0:1LeRlz": {
      config: { direction: "left", toRoom: "blacktooth6" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    scroll: {
      config: {
        text: `
## DOUGHNUTS

![](donuts)Trays of six doughnuts are few and far between, so don't waste shots. Only Head
may pick up doughnuts. The number of remaining doughnuts will be displayed above
the doughnut icon at the bottom left of the screen.

*Head Over Heels Manual*
`,
      },
      position: { x: 1, y: 5, z: 0 },
      type: "scroll",
    },
  },
  planet: "blacktooth",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
