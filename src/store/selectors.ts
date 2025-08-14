import nanoEqual from "nano-equal";
import { useAppSelector } from "./hooks";
import type { RootState } from "./store";
import { objectEntriesIter } from "../utils/entries";
import { iterate } from "../utils/iterate";
import type { KeyAssignmentPresetName } from "../game/input/keyAssignmentPresets";
import { keyAssignmentPresets } from "../game/input/keyAssignmentPresets";
import { size, objectValues } from "iter-tools";
import type {
  GameMenusState,
  InputDirectionMode,
  ShowBoundingBoxes,
  UserSettings,
} from "./slices/gameMenusSlice";
import { defaultUserSettings } from "./defaultUserSettings";
import type { Get, Paths } from "type-fest";
import type { ToggleablePaths } from "../utils/Toggleable";
import { getAtPath } from "../utils/getAtPath";
import { selectTotalUpscale } from "./slices/upscale/upscaleSlice";
import type { Campaign } from "../model/modelTypes";
import { selectMaybeLoadedCampaignData } from "./slices/campaigns/campaignsApiSlice";
import { selectorHook } from "../utils/react/selectorHook";

const selectUserSetting =
  <Path extends Paths<UserSettings>>(path: Path) =>
  (state: RootState): NonNullable<Get<UserSettings, Path>> =>
    getAtPath(state.gameMenus.userSettings, path) ??
    getAtPath(defaultUserSettings, path);

export const useTotalUpscale = () => useAppSelector(selectTotalUpscale);

export const selectInputAssignment = selectUserSetting("inputAssignment");

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

export const useIsGameRunning = () =>
  useAppSelector((state: RootState): boolean => state.gameMenus.gameRunning);

export const selectShowFps = selectUserSetting("showFps");
export const selectEmulatedResolutionName = selectUserSetting(
  "displaySettings.emulatedResolution",
);
export const useEmulatedResolutionName = () =>
  useAppSelector(selectEmulatedResolutionName);

export const selectIsUncolourised = selectUserSetting(
  "displaySettings.uncolourised",
);
export const useIsUncolourised = () => useAppSelector(selectIsUncolourised);
export const selectIsCrtFilter = selectUserSetting("displaySettings.crtFilter");
export const selectIsInfiniteLivesPoke = selectUserSetting("infiniteLivesPoke");
export const selectIsInfiniteDoughnutsPoke = selectUserSetting(
  "infiniteDoughnutsPoke",
);

export const selectHasAllPlanetCrowns = (state: RootState) => {
  return (
    state.gameMenus.gameInPlay.planetsLiberated.egyptus &&
    state.gameMenus.gameInPlay.planetsLiberated.bookworld &&
    state.gameMenus.gameInPlay.planetsLiberated.penitentiary &&
    state.gameMenus.gameInPlay.planetsLiberated.safari
  );
};

export const useIsScreenRelativeControl = () =>
  useAppSelector((state) => state.gameMenus.userSettings.screenRelativeControl);

export const selectInputDirectionMode = selectUserSetting("inputDirectionMode");

export const useInputDirectionMode = (): InputDirectionMode =>
  useAppSelector(selectInputDirectionMode);

export const selectPlanetsLiberatedCount = (state: RootState) =>
  size(
    iterate(objectValues(state.gameMenus.gameInPlay.planetsLiberated)).filter(
      Boolean,
    ),
  );

export const selectShowBoundingBoxes = selectUserSetting(
  "displaySettings.showBoundingBoxes",
);

export const useShowBoundingBoxes = (): ShowBoundingBoxes => {
  return useAppSelector(selectShowBoundingBoxes);
};

export const selectShowShadowMasks = selectUserSetting(
  "displaySettings.showShadowMasks",
);
export const useShowShadowMasks = (): boolean => {
  return useAppSelector(selectShowShadowMasks);
};

export const selectScreenRelativeControl = selectUserSetting(
  "screenRelativeControl",
);

export const selectUserPreferenceOnScreenControls =
  selectUserSetting("onScreenControls");

export const selectIsSoundMuted = selectUserSetting("soundSettings.mute");
export const selectIsNoFootstepSounds = selectUserSetting(
  "soundSettings.noFootsteps",
);

export const selectShouldRenderOnScreenControls = ({
  gameMenus,
  upscale,
}: RootState): boolean =>
  (gameMenus.userSettings.onScreenControls ??
    defaultUserSettings.onScreenControls) &&
  // the on-screen controls currently don't work when the display is rotated,
  // so hide them in this case:
  upscale.upscale.rotate90 === false;

export const useIsUserPreferenceOnScreenControls = () => {
  return useAppSelector(selectUserPreferenceOnScreenControls);
};

export const selectAtPath = (
  state: RootState,
  path: ToggleablePaths<GameMenusState>,
): boolean => {
  return !!getAtPath(state.gameMenus, path);
};

export const useRoomsExplored = <RoomId extends string>() => {
  return useAppSelector(
    (state) => state.gameMenus.gameInPlay.roomsExplored as Record<RoomId, true>,
  );
};

export const selectCurrentCampaign = <RoomId extends string = string>(
  state: RootState,
): Campaign<RoomId> => {
  const maybeCampaign = selectMaybeCurrentCampaign<RoomId>(state);
  if (!maybeCampaign) {
    throw new Error("No current campaign");
  }
  return maybeCampaign;
};

export const useCurrentCampaign = selectorHook(selectCurrentCampaign) as <
  T extends string,
>() => Campaign<T>;

export const selectMaybeCurrentCampaign = <RoomId extends string = string>(
  state: RootState,
): Campaign<RoomId> | undefined => {
  const currentCampaignLocator = state.gameMenus.gameInPlay.campaignLocator;
  return currentCampaignLocator === undefined ? undefined : (
      selectMaybeLoadedCampaignData<RoomId>(state, currentCampaignLocator)
    );
};
