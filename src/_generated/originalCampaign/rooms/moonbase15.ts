import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase15",
  items: {
    "door@0,0,0": {
      config: { direction: "right", toRoom: "moonbase7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,4": {
      config: { direction: "left", toRoom: "moonbase14" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    "hushPuppy@5,0,0": {
      config: {},
      position: { x: 5, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@5,1,0": {
      config: {},
      position: { x: 5, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,0,1": {
      config: {},
      position: { x: 6, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@6,1,1": {
      config: {},
      position: { x: 6, y: 1, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@7,0,2": {
      config: {},
      position: { x: 7, y: 0, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@7,1,2": {
      config: {},
      position: { x: 7, y: 1, z: 2 },
      type: "hushPuppy",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: `
## HUSH PUPPIES

![Hush Puppy](hushPuppy)

These are a very strange type of beast; they are incredibly sleepy. In fact,
they never wake up and it is quite normal for them to sleep for their entire
lives. They are often used as tables and even used as building bricks. They are
a native of Freedom, and for many thousands of years Head and his ancestors have
been mistaking them for Heels and causing so much trouble to the poor old hush
puppies that they evolved a defense mechanism: they somehow learned to teleport
themselves away. Nobody knows where they go, but the instant they see any of
Head's race, they disappear and won't return until they are sure the coast is
clear.

*> head over heels manual*
`,
      },
      position: { x: 3, y: 1, z: 0 },
      type: "pickup",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
