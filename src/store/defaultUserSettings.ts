import type { RequiredDeep } from "type-fest";

import type { UserSettings } from "./slices/gameMenusSlice";

import { keyAssignmentPresets } from "../game/input/keyAssignmentPresets";
import { detectDeviceType } from "../utils/detectDeviceType";

export const defaultUserSettings: RequiredDeep<UserSettings> = {
  inputAssignment: keyAssignmentPresets.default.inputAssignment,
  infiniteLivesPoke: false,
  infiniteDoughnutsPoke: false,

  displaySettings: {
    showBoundingBoxes: "none",
    showShadowMasks: false,
    crtFilter: false,
    uncolourised: false,
    emulatedResolution:
      detectDeviceType() === "mobile" ? "handheld" : "zxSpectrum",
  },

  showFps: false,
  onScreenControls:
    detectDeviceType() === "mobile" || detectDeviceType() === "tablet",
  inputDirectionMode: "8-way",
  screenRelativeControl: false,

  soundSettings: {
    mute: false,
    noFootsteps: false,
  },
};
