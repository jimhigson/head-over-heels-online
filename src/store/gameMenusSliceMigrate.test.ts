import { describe, expect, test } from "vitest";
import v13Json from "./__test__/persistedVersionSamples/v13.json";
import { gameMenusSliceMigrate } from "./gameMenusSliceMigrate";
import type { GameMenusSlicePersisted } from "./store";
import { nonRenderingItemFixedZIndex } from "../game/render/sortZ/fixedZIndexes";
import type { PersistedState } from "redux-persist";

describe("v13 -> 14 migration", () => {
  const migrationTargetVersion = 14;

  test("provides item with z-index in currentGame", async () => {
    // json saved in v13 crashed on blockstack.ing after merging PR 256, version was bumped to 14
    // in response - check we don't lose compatibility again

    // this wall was causing a crash when head's room reloaded, because it was trying to sort itself
    // into the z-index, but (since it didn't have an appearance) there was no node in the pixi scene
    // graph to assign the z-index to. The migration should have given it this z-index.

    const migrated = (await gameMenusSliceMigrate(
      structuredClone(v13Json),
      migrationTargetVersion,
    )) as GameMenusSlicePersisted & PersistedState;

    expect(
      migrated.currentGame?.gameState.characterRooms.head?.items[
        "wall@0,0,0:2scjwz"
      ].fixedZIndex,
    ).toEqual(nonRenderingItemFixedZIndex);
  });

  test("provides correct type in reincarnation point", async () => {
    const migrated = (await gameMenusSliceMigrate(
      structuredClone(v13Json),
      migrationTargetVersion,
    )) as GameMenusSlicePersisted & PersistedState;

    expect(
      migrated.currentGame?.store.gameMenus.reincarnationPoint?.gameState
        .characterRooms.head?.items["door@16,1,0/portal"].fixedZIndex,
    ).toEqual(nonRenderingItemFixedZIndex);
  });
});
