import { expect } from "@playwright/test";

import { campaignToDataParam } from "../src/db/campaignToDataParam";
import { type Campaign } from "../src/model/modelTypes";
import {
  type setEmulatedResolution,
  type SpriteOption,
} from "../src/store/slices/userSettings/userSettingsSlice";
import { dispatchToStore } from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { setupE2ePage } from "./testUtils/pageSetup";
import { menuScreenshotOptions } from "./testUtils/screenshots";
import { test } from "./testUtils/test";

/**
 * A campaign with a room but no playable character (no head, no heels).
 * Booting it makes loadGameState throw "couldn't find either head or heels in
 * campaign", which GamePage catches, wraps, and surfaces as the errorCaught
 * dialog. The room is inlined rather than imported from basicRoom.ts, since
 * that helper pulls in the game's module graph (down to .mp3 imports) which the
 * Playwright runner can't resolve.
 */
const noPlayableCampaign: Campaign<string> = {
  locator: {
    campaignName: "noPlayableTestCampaign",
    userId: "anon",
    version: 0,
  },
  rooms: {
    firstRoom: {
      id: "firstRoom",
      planet: "blacktooth",
      color: { hue: "cyan", shade: "basic" },
      items: {
        floor: {
          type: "floor",
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 8, y: 8 },
          },
          position: { x: 0, y: 0, z: 0 },
        },
      },
    },
  },
};

/** built once at runtime by gzip + url-safe-base64 encoding the campaign above */
let noPlayableCampaignUrl: string;

test.beforeAll(async () => {
  noPlayableCampaignUrl = `/?${new URLSearchParams({
    campaignName: await campaignToDataParam(noPlayableCampaign),
    campaignAuthorUserId: "editorUser",
    cheats: "1",
    track: "0",
  }).toString()}`;
});

const errorDialogSelector = 'dialog[data-dialog-id="errorCaught"]';
const stackTraceSelector = '[data-test-id="error-report"]';

const blockStackColourised: SpriteOption = {
  name: "BlockStack",
  uncolourised: false,
};

test.beforeEach(async ({ page }) => {
  // this test deliberately provokes the errorCaught dialog, so opt out of the
  // shared handler that would otherwise fail the test when it appears
  await setupE2ePage(page, { failOnErrorDialog: false });
});

test("errorCaught dialog opens and reports a thrown exception", async ({
  page,
}, testInfo) => {
  // hosted on the menuSnapshotsDialogs job, which runs several projects, but
  // this dialog is only baselined for chromium-desktop
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "the errorCaught dialog snapshot is only baselined for chromium-desktop",
  );
  test.setTimeout(60_000 * osSlowness);

  await page.goto(noPlayableCampaignUrl);

  await test.step("the error dialog opens", async () => {
    await page.locator(errorDialogSelector).waitFor({ state: "visible" });
  });

  await test.step("the report content is present (the pre is masked in the snapshot)", async () => {
    const report = await page.locator(stackTraceSelector).textContent();
    // the main message from the thrown exception — kept minimal so it isn't
    // brittle to the wording of the wrapper errors or the report layout
    expect(report).toContain("couldn't find either head or heels in campaign");
    // the runtime-environment header (the feature this test guards) is masked
    // out of the snapshot, so assert its presence here
    expect(report).toContain("running as:");
  });

  await test.step("set emulated resolution to the highest", async () => {
    type SetEmulatedResolutionAction = ReturnType<typeof setEmulatedResolution>;
    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: "amigaHiResPal",
    } satisfies SetEmulatedResolutionAction);
  });

  await test.step("snapshot the dialog", async () => {
    await expect(page).toHaveScreenshot("errorCaughtDialog.png", {
      ...menuScreenshotOptions(
        page,
        blockStackColourised,
        testInfo.project.name,
      ),
      // the report <pre> renders with the system monospace font, which differs
      // across OSes; mask it so the snapshot is stable on every runner. Its
      // content is asserted as text above instead.
      mask: [page.locator(stackTraceSelector)],
    });
  });
});
