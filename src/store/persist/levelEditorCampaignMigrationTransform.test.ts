import { expect, test } from "vitest";

import { type EditorCampaign } from "../../editor/editorTypes";
import { levelEditorCampaignMigrationTransform } from "./levelEditorCampaignMigrationTransform";

test("a campaign restored from storage has its teleporters' store-path conditions migrated", () => {
  const stored = {
    locator: { campaignName: "test", userId: "test", version: 0 },
    rooms: {
      room: {
        id: "room",
        planet: "egyptus",
        color: { hue: "cyan", shade: "basic" },
        items: {
          t: {
            type: "teleporter",
            position: { x: 0, y: 0, z: 0 },
            config: {
              toRoom: "elsewhere",
              activatedOnStoreValue: "planetsLiberated.egyptus",
            },
          },
        },
      },
    },
  } as unknown as EditorCampaign;

  const restored = levelEditorCampaignMigrationTransform.out(
    stored,
    "campaignInProgress",
    {},
  );

  expect(Object.values(restored?.rooms ?? {})[0]?.items).toEqual({
    t: {
      type: "teleporter",
      position: { x: 0, y: 0, z: 0 },
      config: { toRoom: "elsewhere", activatedIfPlanetLiberated: "egyptus" },
    },
  });
});
