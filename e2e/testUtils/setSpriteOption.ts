import type { Page } from "@playwright/test";

import type {
  setSpritesOption,
  SpriteOption,
} from "../../src/store/slices/gameMenus/gameMenusSlice";

import { dispatchToStore } from "./gameStateQueries";
import { osSlowness, retryWithRecovery } from "./infrastructure";
import { elapsed } from "./logging";

export const setSpriteOption = async (
  page: Page,
  formattedName: string,
  spriteOption: SpriteOption,
) => {
  await retryWithRecovery({
    async action() {
      console.log(
        `${formattedName} ${elapsed()}: setting sprite option to ${spriteOption.name} (uncolourised: ${spriteOption.uncolourised})`,
      );

      type SetSpritesOption = ReturnType<typeof setSpritesOption>;
      const success = await dispatchToStore(page, {
        type: "gameMenus/setSpritesOption",
        payload: spriteOption,
      } satisfies SetSpritesOption);

      if (!success) {
        throw new Error(
          `Failed to dispatch to store - setting sprite option to ${spriteOption.name}`,
        );
      }

      // let render one more frame with the new setting:
      await page.waitForTimeout(100 * osSlowness);
    },
    async recovery() {
      console.log(
        `${formattedName} ${elapsed()}: Retrying to set sprite option`,
      );
    },
    logHeader: formattedName,
    actionDescription: "Change sprite option",
    page,
    screenshotPrefix: `sprite-option-${spriteOption.name}-${spriteOption.uncolourised}`,
  });
};
