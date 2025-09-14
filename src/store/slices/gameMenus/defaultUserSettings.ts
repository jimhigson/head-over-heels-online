import type { RequiredDeep } from "type-fest";

import type { UserSettings } from "./gameMenusSlice";

import { keyAssignmentPresets } from "../../../game/input/keyAssignmentPresets";
import { detectDeviceType } from "../../../utils/detectDeviceType";

export const defaultUserSettings: RequiredDeep<UserSettings> = {
  inputAssignment: keyAssignmentPresets.default.inputAssignment,
  infiniteLivesPoke: false,
  infiniteDoughnutsPoke: false,

  displaySettings: {
    showBoundingBoxes: "none",
    showShadowMasks: false,
    // crt filters are distinctive look for the game,
    // but also maybe slow it down on older devices
    crtFilter: true,
    uncolourised: false,
    emulatedResolution:
      detectDeviceType() === "mobile" ? "handheld" : "zxSpectrum",
  },

  gameSpeed: 1.2,
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
