import type { RequiredDeep } from "type-fest";
import { keyAssignmentPresets } from "../game/input/keyAssignmentPresets";
import { detectDeviceType } from "../utils/detectDeviceType";
import { UserSettings } from "./gameMenusSlice";


export const defaultUserSettings: RequiredDeep<UserSettings> = {
  inputAssignment: keyAssignmentPresets.default.inputAssignment,
  infiniteLivesPoke: false,

  displaySettings: {
    showBoundingBoxes: "none",
    showShadowMasks: false,
    crtFilter: false,
    uncolourised: false,
    emulatedResolution: detectDeviceType() === "mobile" ? "gameboy" : "zxSpectrum",
  },

  showFps: false,
  onScreenControls: detectDeviceType() === "mobile" || detectDeviceType() === "tablet",
  inputDirectionMode: "8-way",
  screenRelativeControl: false,
};
