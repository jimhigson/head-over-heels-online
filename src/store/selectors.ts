import nanoEqual from "nano-equal";
import { useAppSelector } from "./hooks";
import type { RootState } from "./store";
import { objectEntriesIter } from "../utils/entries";
import { iterate } from "../utils/iterate";
import type { KeyAssignmentPresetName } from "../game/input/keyAssignmentPresets";
import { keyAssignmentPresets } from "../game/input/keyAssignmentPresets";
import { size, objectValues } from "iter-tools";
import type { ShowBoundingBoxes } from "./gameMenusSlice";
import { defaultUserSettings } from "./gameMenusSlice";
import type { ResolutionName } from "../originalGame";
import type { InputAssignment } from "../game/input/InputState";

export const selectTotalUpscale = (state: RootState): number => {
  const {
    upscale: { cssUpscale, gameEngineUpscale },
  } = state;
  return cssUpscale * gameEngineUpscale;
};
export const useTotalUpscale = () => useAppSelector(selectTotalUpscale);

export const selectInputAssignment = (state: RootState): InputAssignment =>
  state.userSettings.inputAssignment ?? defaultUserSettings.inputAssignment;

export const useInputAssignment = () => useAppSelector(selectInputAssignment);

export const selectIsPaused = (state: RootState) => state.openMenus.length > 0;

export const useCheatsOn = (): boolean =>
  useAppSelector((state) => state.cheatsOn);

export const selectIsAssigningKeys = (state: RootState): boolean =>
  state.assigningInput !== undefined;

export const useIsAssigningKeys = (): boolean =>
  useAppSelector(selectIsAssigningKeys);

/** selects the name of the current key assignment preset (if any is being used) */
export const selectCurrentInputPreset = (
  state: RootState,
): KeyAssignmentPresetName | undefined => {
  for (const [name, preset] of iterate(
    objectEntriesIter(keyAssignmentPresets),
  )) {
    if (nanoEqual(preset.inputAssignment, state.userSettings.inputAssignment)) {
      return name;
    }
  }
  return undefined;
};

export const selectShowFps = (state: RootState): boolean =>
  state.userSettings.showFps ?? defaultUserSettings.showFps;

export const selectEmulatedResolutionName = (
  state: RootState,
): ResolutionName => {
  return (
    state.userSettings.displaySettings.emulatedResolution ??
    defaultUserSettings.displaySettings.emulatedResolution
  );
};

export const useIsGameRunning = () =>
  useAppSelector((state: RootState): boolean => state.gameRunning);

export const selectIsColourised = (state: RootState): boolean =>
  state.userSettings.displaySettings.colourise ??
  defaultUserSettings.displaySettings.colourise;

export const useIsColourised = () => useAppSelector(selectIsColourised);

export const selectIsCrtFilter = (state: RootState): boolean =>
  state.userSettings.displaySettings.crtFilter ??
  defaultUserSettings.displaySettings.crtFilter;

export const selectIsInfiniteLivesPoke = (state: RootState): boolean =>
  state.userSettings.infiniteLivesPoke ?? defaultUserSettings.infiniteLivesPoke;

export const selectHasAllPlanetCrowns = (state: RootState) => {
  return (
    state.planetsLiberated.egyptus &&
    state.planetsLiberated.bookworld &&
    state.planetsLiberated.penitentiary &&
    state.planetsLiberated.safari
  );
};

export const useIsScreenRelativeControl = () =>
  useAppSelector((state) => state.userSettings.screenRelativeControl);

export const useIsAnalogueControl = (): boolean =>
  useAppSelector(
    (state) =>
      state.userSettings.analogueControl ?? defaultUserSettings.analogueControl,
  );

export const selectPlanetsLiberatedCount = (state: RootState) =>
  size(iterate(objectValues(state.planetsLiberated)).filter(Boolean));

export const selectShowBoundingBoxes = (state: RootState): ShowBoundingBoxes =>
  state.userSettings.displaySettings.showBoundingBoxes ??
  defaultUserSettings.displaySettings.showBoundingBoxes;

export const useShowBoundingBoxes = (): ShowBoundingBoxes => {
  return useAppSelector(selectShowBoundingBoxes);
};

export const useShowShadowMasks = (): boolean => {
  return useAppSelector(
    (state: RootState) =>
      state.userSettings.displaySettings.showShadowMasks ??
      defaultUserSettings.displaySettings.showShadowMasks,
  );
};

export const selectAnalogueControl = (state: RootState): boolean =>
  state.userSettings.analogueControl ?? defaultUserSettings.analogueControl;

export const selectScreenRelativeControl = (state: RootState): boolean =>
  state.userSettings.screenRelativeControl ??
  defaultUserSettings.screenRelativeControl;
