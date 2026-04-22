import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth0switches",
  items: {
    b: {
      config: { style: "artificial", times: { x: 2, y: 6 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    bu: {
      config: { action: "nextSpritesOption", type: "in-store" },
      position: { x: 3, y: 2, z: 1 },
      type: "button",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth1head" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "market",
        times: { x: 4, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    scroll: {
      config: {
        gives: "scroll",
        markdown: [
          "## ![](texture-animated-bubbles_cold?sprites-normal-height) Notice to All Minions",
          "",
          "![](texture-blacktooth_wall_shield_away?float-right)*By Imperial Decree*, this chamber has been fitted with an Appearance Modulation Device.",
          "",
          "Rest assured the effects are entirely harmless. Most subjects adapt to the loss of black outlines within a week or two.",
          "",
          "*Step on the button to cycle the castle’s visual rendering*. The Emperor grew tired of the monochrome decor after thirty-eight years and commissioned a colourised renovation from some enthusiast on the internet, who for reasons best known to himself spent the last year painstakingly remaking our castle.",
          "",
          "The second setting restores the *original monochrome look*, for those minions who prefer squinting at things the old-fashioned way.",
          "",
          "The third style was contributed by a talented artist called Toppy, who redrew your sprites in his own distinctive style. Walls and floors have not yet been redecorated.",
          "",
          "The switch activates a *Cathode Ray Tube*. The whole castle was once viewed through one of these devices.",
          "",
          "Do not adjust during crown inspections.",
          "",
          "*> Further visual adjustment in the Settings menu.*",
        ],
        source: "inline",
      },
      position: { x: 3, y: 4.5, z: 3 },
      type: "pickup",
    },
    sw: {
      config: {
        initialSetting: "left",
        path: "displaySettings.crtFilter",
        type: "in-store",
      },
      position: { x: 3, y: 3, z: 1 },
      type: "switch",
    },
    w: {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["bars", "bars", "bars", "bars"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
