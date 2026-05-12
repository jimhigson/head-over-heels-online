import type { RequiredDeep, SimplifyDeep } from "type-fest";

import type { UserSettings } from "./userSettingsSlice";

import { keyAssignmentPresets } from "../../../game/input/keyAssignmentPresets";
import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";

// like UserSettings but with less optionality:
type DefaultUserSettings = SimplifyDeep<
  Required<UserSettings> &
    RequiredDeep<Pick<UserSettings, "displaySettings" | "soundSettings">>
>;

export const defaultUserSettings: DefaultUserSettings = {
  inputAssignment: keyAssignmentPresets.Default.inputAssignment,
  pokesEnabled: {
    infiniteLives: false,
    infiniteDoughnuts: false,
  },

  displaySettings: {
    showBoundingBoxTypes: [],
    showRoomScrollBounds: false,
    showShadowMasks: false,
    // crt filters are distinctive look for the game,
    // but also maybe slow it down on older devices
    crtFilter: false,
    emulatedResolution:
      detectDeviceType() === "mobile" ? "handheld" : "zxSpectrum",
    sprites: { name: "BlockStack", uncolourised: false },
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
