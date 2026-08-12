import { type Page } from "@playwright/test";

import { campaignToDataParam } from "../../src/db/campaignToDataParam";
import { type Campaign } from "../../src/model/modelTypes";
import { type ResolutionName } from "../../src/originalGame";
import {
  dispatchToStore,
  setZeroGameSpeed,
  waitForGameReady,
} from "./gameStateQueries";

/**
 * boot straight into a campaign via a playtest-style `data:` campaign url, with
 * physics frozen for deterministic snapshots. A playtest boots directly into
 * the campaign's start room, so there is no uncaptured room to freeze in first;
 * instead physics is frozen via the store the moment it exists - long before
 * the campaign/spritesheets finish loading, so nothing ever moves.
 *
 * Callers do their own `setupE2ePage` first.
 */
export const bootPlaytestCampaign = async <RoomId extends string>(
  page: Page,
  campaign: Campaign<RoomId>,
  /**
   * set before the room renders, so the whole room fits on screen; null leaves
   * it unset, so the platform default applies
   */
  emulatedResolution: null | ResolutionName,
) => {
  const params = new URLSearchParams({
    campaignName: await campaignToDataParam(campaign),
    campaignAuthorUserId: "e2e",
    cheats: "1",
    track: "0",
  });

  // Freeze the game before its very first physics tick, race-free. store.ts
  // publishes the store to `window._e2e_store` synchronously at module-eval,
  // before the main loop is even created; intercepting that assignment and
  // dispatching zero game speed inside it guarantees the loop reads speed zero
  // on its first tick. A polling approach (setInterval/setTimeout) can lose this
  // race: its callback is a macrotask that gets starved while boot does heavy
  // synchronous work, so the ticker's first rAF frame can run first and advance
  // roomTime by a wall-clock-variable amount. That variance is invisible in
  // sparse rooms but, in a room full of fast monsters that are then
  // fast-forwarded, becomes a non-deterministic pixel difference (worse under CI
  // load). The context starts with empty localStorage, so nothing rehydrates a
  // non-zero speed over this.
  await page.addInitScript(() => {
    let heldStore: typeof window._e2e_store;
    Object.defineProperty(window, "_e2e_store", {
      configurable: true,
      get: () => heldStore,
      set(newStore: typeof window._e2e_store) {
        heldStore = newStore;
        newStore?.dispatch({
          type: "userSettings/setGameSpeed",
          payload: 0,
        });
      },
    });
  });

  await page.goto(`/?${params.toString()}`);
  await page.waitForFunction(() => window._e2e_store !== undefined, {
    timeout: 30_000,
  });
  await dispatchToStore(page, {
    type: "userSettings/setGameSpeed",
    payload: 0,
  });
  await dispatchToStore(page, {
    type: "userSettings/setEmulatedResolution",
    payload: emulatedResolution,
  });
  // playtest (data: url) mode skips the crowns intro dialog entirely:
  await waitForGameReady(page);
  await setZeroGameSpeed(page);
};
