import { type Page } from "@playwright/test";

import { campaignToDataParam } from "../../src/db/campaignToDataParam";
import { type Campaign } from "../../src/model/modelTypes";
import { type ResolutionName } from "../../src/originalGame";
import {
  dispatchToStore,
  setZeroGameSpeed,
  waitForGameState,
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
  await waitForGameState(page);
  await setZeroGameSpeed(page);
};
