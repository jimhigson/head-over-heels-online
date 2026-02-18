import type { RequiredDeep, Simplify } from "type-fest";

import type { UserSettings } from "./gameMenusSlice";

import { keyAssignmentPresets } from "../../../game/input/keyAssignmentPresets";
import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";

// like UserSettings but with less optionality:
type DefaultUserSettings = Simplify<
  Required<UserSettings> &
    RequiredDeep<Pick<UserSettings, "displaySettings" | "soundSettings">>
>;

export const defaultUserSettings: DefaultUserSettings = {
  inputAssignment: keyAssignmentPresets.Default.inputAssignment,
  infiniteLivesPoke: false,
  infiniteDoughnutsPoke: false,

  displaySettings: {
    showBoundingBoxes: "none",
    showShadowMasks: false,
    // crt filters are distinctive look for the game,
    // but also maybe slow it down on older devices
    crtFilter: false,
    uncolourised: false,
    emulatedResolution:
      detectDeviceType() === "mobile" ? "handheld" : "zxSpectrum",
  },

  gameSpeed: 1.2,
  showFps: false,
  onScreenControls:
    detectDeviceType() === "mobile" || detectDeviceType() === "tablet",
  inputDirectionMode: "8-way",
  directionsRelativeTo: "mixed",

  soundSettings: {
    mute: false,
    noRoomEntryTunes: true,
    noFootsteps: false,
  },
};
