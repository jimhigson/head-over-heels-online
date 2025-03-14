import nanoEqual from "nano-equal";
import { useAppSelector } from "./hooks";
import type { RootState } from "./store";
import { objectEntriesIter } from "../utils/entries";
import { iterate } from "../utils/iterate";
import type { KeyAssignmentPresetName } from "../game/input/keyAssignmentPresets";
import { keyAssignmentPresets } from "../game/input/keyAssignmentPresets";
import { size, objectValues } from "iter-tools";
import type {
  InputDirectionMode,
  ShowBoundingBoxes,
} from "./slices/gameMenusSlice";
import { defaultUserSettings } from "./defaultUserSettings";
import type { ResolutionName } from "../originalGame";
import type { InputAssignment } from "../game/input/InputState";
import type { PickDeep } from "type-fest";

export const selectTotalUpscale = (state: RootState): number => {
  const {
    gameMenus: {
      upscale: { cssUpscale, gameEngineUpscale },
    },
  } = state;
  return cssUpscale * gameEngineUpscale;
};
export const useTotalUpscale = () => useAppSelector(selectTotalUpscale);

export const selectInputAssignment = (state: RootState): InputAssignment =>
  state.gameMenus.userSettings.inputAssignment ??
  defaultUserSettings.inputAssignment;

export const useInputAssignment = () => useAppSelector(selectInputAssignment);

export const selectIsPaused = (state: RootState) =>
  state.gameMenus.openMenus.length > 0;

export const useCheatsOn = (): boolean =>
  useAppSelector((state) => state.gameMenus.cheatsOn);

export const selectIsAssigningKeys = (state: RootState): boolean =>
  state.gameMenus.assigningInput !== undefined;

export const useIsAssigningKeys = (): boolean =>
  useAppSelector(selectIsAssigningKeys);

/** selects the name of the current key assignment preset (if any is being used) */
export const selectCurrentInputPreset = (
  state: RootState,
): KeyAssignmentPresetName | undefined => {
  for (const [name, preset] of iterate(
    objectEntriesIter(keyAssignmentPresets),
  )) {
    if (
      nanoEqual(
        preset.inputAssignment,
        state.gameMenus.userSettings.inputAssignment,
      )
    ) {
      return name;
    }
  }
  return undefined;
};

export const selectShowFps = (state: RootState): boolean =>
  state.gameMenus.userSettings.showFps ?? defaultUserSettings.showFps;

export const selectEmulatedResolutionName = (
  state: PickDeep<RootState, "gameMenus.userSettings">,
): ResolutionName => {
  return (
    state.gameMenus.userSettings.displaySettings.emulatedResolution ??
    defaultUserSettings.displaySettings.emulatedResolution
  );
};
export const useEmulatedResolutionName = () =>
  useAppSelector(selectEmulatedResolutionName);

export const useIsGameRunning = () =>
  useAppSelector((state: RootState): boolean => state.gameMenus.gameRunning);

export const selectIsColourised = (state: RootState): boolean =>
  !(
    state.gameMenus.userSettings.displaySettings.uncolourised ??
    defaultUserSettings.displaySettings.uncolourised
  );

export const useIsColourised = () => useAppSelector(selectIsColourised);

export const selectIsCrtFilter = (state: RootState): boolean =>
  state.gameMenus.userSettings.displaySettings.crtFilter ??
  defaultUserSettings.displaySettings.crtFilter;

export const selectIsInfiniteLivesPoke = (state: RootState): boolean =>
  state.gameMenus.userSettings.infiniteLivesPoke ??
  defaultUserSettings.infiniteLivesPoke;

export const selectIsInfiniteDoughnutsPoke = (state: RootState): boolean =>
  state.gameMenus.userSettings.infiniteDoughnutsPoke ??
  defaultUserSettings.infiniteDoughnutsPoke;

export const selectHasAllPlanetCrowns = (state: RootState) => {
  return (
    state.gameMenus.planetsLiberated.egyptus &&
    state.gameMenus.planetsLiberated.bookworld &&
    state.gameMenus.planetsLiberated.penitentiary &&
    state.gameMenus.planetsLiberated.safari
  );
};

export const useIsScreenRelativeControl = () =>
  useAppSelector((state) => state.gameMenus.userSettings.screenRelativeControl);

export const selectInputDirectionMode = (
  state: PickDeep<RootState, "gameMenus.userSettings">,
): InputDirectionMode =>
  state.gameMenus.userSettings.inputDirectionMode ??
  defaultUserSettings.inputDirectionMode;

export const useInputDirectionMode = (): InputDirectionMode =>
  useAppSelector(selectInputDirectionMode);

export const selectPlanetsLiberatedCount = (state: RootState) =>
  size(iterate(objectValues(state.gameMenus.planetsLiberated)).filter(Boolean));

export const selectShowBoundingBoxes = (state: RootState): ShowBoundingBoxes =>
  state.gameMenus.userSettings.displaySettings.showBoundingBoxes ??
  defaultUserSettings.displaySettings.showBoundingBoxes;

export const useShowBoundingBoxes = (): ShowBoundingBoxes => {
  return useAppSelector(selectShowBoundingBoxes);
};

export const useShowShadowMasks = (): boolean => {
  return useAppSelector(
    (state: RootState) =>
      state.gameMenus.userSettings.displaySettings.showShadowMasks ??
      defaultUserSettings.displaySettings.showShadowMasks,
  );
};

export const selectScreenRelativeControl = (state: RootState): boolean =>
  state.gameMenus.userSettings.screenRelativeControl ??
  defaultUserSettings.screenRelativeControl;

export const selectOnScreenControls = (state: RootState): boolean =>
  state.gameMenus.userSettings.onScreenControls ??
  defaultUserSettings.onScreenControls;

export const useIsOnScreenControls = () => {
  return useAppSelector(selectOnScreenControls);
};
