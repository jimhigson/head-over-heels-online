import type { UserSettings } from "./gameMenusSlice";

export const emptyUserSettings: UserSettings = {
  displaySettings: {},
  soundSettings:
    navigator.webdriver ?
      // avoid playing sounds while running visual integration tests:
      { mute: true }
    : {},
};
