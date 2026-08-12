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

  // Freeze the game in-page, the instant the store exists, and keep re-asserting
  // zero speed until the game is ready. Dispatching from the node side instead
  // (waitForFunction + dispatchToStore) costs a round-trip, during which the
  // main loop can run a few physics ticks - so the "frozen" starting state lands
  // at a wall-clock-variable roomTime rather than 0. That variance is invisible
  // in sparse rooms but, in a room full of fast monsters that are then
  // fast-forwarded, becomes a non-deterministic pixel difference (worse on
  // slower CI). Doing it in-page pins roomTime at 0 deterministically on every
  // platform. The context starts with empty localStorage, so there is no
  // persisted speed to rehydrate over this.
  await page.addInitScript(() => {
    const interval = setInterval(() => {
      window._e2e_store?.dispatch({
        type: "userSettings/setGameSpeed",
        payload: 0,
      });
      if (window._e2e_gamePageGameAi !== undefined) {
        clearInterval(interval);
      }
    }, 0);
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
