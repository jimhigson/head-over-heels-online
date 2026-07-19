import { type RequiredDeep, type SimplifyDeep } from "type-fest";

import { keyAssignmentPresets } from "../../../game/input/keyAssignmentPresets";
import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";
import { type UserSettings } from "./userSettingsSlice";

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
    showSubrooms: false,
    // crt filters are distinctive look for the game,
    // but also maybe slow it down on older devices
    crtFilter: false,
    // authentic blocky pixels by default; cleanEdge smoothing is opt-in
    smoothSprites: false,
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
    roomEntryTunes: "sparse",
    noFootsteps: false,
  },
};
