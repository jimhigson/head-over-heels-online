import type { Page } from "@playwright/test";

import type { toggleUserSetting } from "../src/store/slices/gameMenus/gameMenusSlice";

import { dispatchToStore } from "./e2eStoreUtils";
import { osSlowness } from "./osSlowness";
import { retryWithRecovery } from "./retryWithRecovery";

export const setIsUncolourised = async (
  page: Page,
  formattedName: string,
  uncolourised: boolean,
) => {
  await retryWithRecovery({
    async action() {
      console.log(`${formattedName}: setting uncolourised to ${uncolourised}`);

      type ToggleUserSetting = ReturnType<typeof toggleUserSetting>;
      const successSetUnColourised = await dispatchToStore(page, {
        type: "gameMenus/toggleUserSetting",
        payload: {
          path: "displaySettings.uncolourised",
          value: uncolourised,
        },
      } satisfies ToggleUserSetting);

      if (!successSetUnColourised) {
        throw new Error(
          `Failed to dispatch to store - setting uncolourised to ${uncolourised}`,
        );
      }

      // let render one more frame with the new setting:
      await page.waitForTimeout(100 * osSlowness);
    },
    async recovery() {
      console.log(`${formattedName}: Retrying to set uncolourised setting`);
    },
    logHeader: formattedName,
    actionDescription: "Change uncolourised setting",
    page,
    screenshotPrefix: `uncolourised-set-to-${uncolourised}`,
  });
};
