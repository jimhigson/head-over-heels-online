import type { WritableDraft } from "immer";
import type { Get, Paths } from "type-fest";

import { objectValues, size } from "iter-tools-es";
import nanoEqual from "nano-equal";

import type { KeyAssignmentPresetName } from "../../../game/input/keyAssignmentPresets";
import type { Campaign } from "../../../model/modelTypes";
import type { RootState } from "../../store";
import type {
  GameMenusState,
  InputDirectionMode,
  ShowBoundingBoxes,
  UserSettings,
  UserSettingsBooleanPaths,
} from "./gameMenusSlice";

import { keyAssignmentPresets } from "../../../game/input/keyAssignmentPresets";
import { objectEntriesIter } from "../../../utils/entries";
import { getAtPath } from "../../../utils/getAtPath";
import { iterate } from "../../../utils/iterate";
import { selectorHook } from "../../../utils/react/selectorHook";
import { useAppSelector } from "../../hooks";
import { selectMaybeLoadedCampaignData } from "../campaigns/campaignsApiSlice";
import { defaultUserSettings } from "./defaultUserSettings";

const selectUserSetting =
  <Path extends Paths<UserSettings>>(path: Path) =>
  (state: RootState): NonNullable<Get<UserSettings, Path>> =>
    getAtPath(state.gameMenus.userSettings, path) ??
    getAtPath(defaultUserSettings, path);

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
export const selectGameSpeed = selectUserSetting("gameSpeed");
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

export const selectDirectionsRelativeTo = selectUserSetting(
  "directionsRelativeTo",
);

export const useDirectionsRelativeTo = () =>
  useAppSelector(selectDirectionsRelativeTo);

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

export const selectBooleanUserSetting = (
  gameMenusState: GameMenusState | WritableDraft<GameMenusState>,
  path: UserSettingsBooleanPaths,
): boolean => {
  return !!(
    getAtPath(gameMenusState.userSettings, path) ??
    getAtPath(defaultUserSettings, path) ??
    false
  );
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
    throw new Error(
      `No current campaign. Campaign locator is:\n${JSON.stringify(state.gameMenus.gameInPlay.campaignLocator, null, 2)}`,
    );
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
