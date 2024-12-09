import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "blacktooth3",
  items: {
    "block@3,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@4,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "door@3,6,2:29aJEC": {
      config: { direction: "away", toRoom: "blacktooth2" },
      position: { x: 3, y: 6, z: 2 },
      type: "door",
    },
    scroll: {
      config: {
        text: `
## HINTS AND TIPS

1. ![](hud.char.1) Beginners should aim to escape from Blacktooth and get back to Freedom
   initially. Only the very skillful can hope to liberate a planet or two.
2. ![](hud.char.2) When you first get Head and Heels in the same location, practice placing Head
   on top of Heels and joining them together accurately with the swop key. Both
   of their icons will light up when they are successfully joined.
3. ![](hud.char.3) Remember Head and Heels are a team. Just because both are in the same room
   does not mean you have to join them together, and in fact, some problems may
   only be solved by separating Head and Heels.
4. ![](hud.char.4) Make sure Head learns to climb ladders; this is an essential skill.
5. ![](hud.char.5) Both Heels’s bag and Head’s hooter must be collected at the initial stages
   for there to be any chance of completing the game.
6. ![](hud.char.6) If Head and Heels are in the same room, extra jumping height may be obtained
   by one jumping off the other’s back.
7. ![](hud.char.7) Find a safe spot and get used to how far Head and Heels may move over the
   edge of a brick before they fall. This will enable you to make the longest
   jumps. Both Head and Heels will jump slightly further if they are running as
   they jump.
8. ![](hud.char.8) Learn the difference in distance and control between Head’s jumps and Heels’s
   jumps.
9. ![](hud.char.9) Make a map.
10. ![](hud.char.1)![](hud.char.0) Do not waste doughnuts; they are not easy to find.
11. ![](hud.char.1)![](hud.char.1)Do not get confused; only Heels may carry anything, and only Head may fire.
12. ![](hud.char.1)![](hud.char.2)To discover if there is a room above, pile objects as high as possible and
    jump from the top. If there is a spring in the room, put it on the top for
    extra jumping height.
13. ![](hud.char.1)![](hud.char.3)If you can’t understand a room, try exiting and entering again, watching
    carefully for any movement in the room as you enter.

*> Head Over Heels Manual*
`,
      },
      position: { x: 7, y: 5, z: 1 },
      type: "scroll",
    },
    scrollBlock: {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth4",
  size: { x: 8, y: 6 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
