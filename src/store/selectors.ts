import nanoEqual from "nano-equal";
import { useAppSelector } from "./hooks";
import type { RootState } from "./store";
import { objectEntriesIter } from "../utils/entries";
import { iterate } from "../utils/iterate";
import type { KeyAssignmentPresetName } from "../game/input/keyAssignmentPresets";
import { keyAssignmentPresets } from "../game/input/keyAssignmentPresets";

export const useTotalUpscale = () =>
  useAppSelector((state) => {
    const {
      upscale: { cssUpscale, gameEngineUpscale },
    } = state;
    return cssUpscale * gameEngineUpscale;
  });

export const useInputAssignment = () =>
  useAppSelector((state) => state.userSettings.inputAssignment);

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
  state.userSettings.showFps;

export const useIsGameRunning = () =>
  useAppSelector((state: RootState): boolean => state.gameRunning);

export const selectHasAllPlanetCrowns = (state: RootState) => {
  return (
    state.planetsLiberated.egyptus &&
    state.planetsLiberated.bookworld &&
    state.planetsLiberated.penitentiary &&
    state.planetsLiberated.safari
  );
};
