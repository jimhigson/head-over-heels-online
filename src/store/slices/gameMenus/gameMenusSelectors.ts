import { createSelector } from "@reduxjs/toolkit";
import { type WritableDraft } from "immer";
import nanoEqual from "nano-equal";
import { type Get, type Paths } from "type-fest";

import {
  type KeyAssignmentPresetName,
  keyAssignmentPresets,
} from "../../../game/input/keyAssignmentPresets";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { type Campaign } from "../../../model/modelTypes";
import { makeSpritesheetData } from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type AppSpritesheetData } from "../../../sprites/spritesheet/variants/AppSpritesheet";
import { objectEntriesIter, valuesIter } from "../../../utils/entries";
import { getAtPath } from "../../../utils/getAtPath";
import { size } from "../../../utils/iterators/size";
import { selectorHook } from "../../../utils/react/selectorHook";
import { useAppSelector } from "../../hooks";
import { type GameRootState } from "../../store";
import { selectMaybeLoadedCampaignData } from "../campaigns/gameCampaignsApiSlice";
import { defaultUserSettings } from "../userSettings/defaultUserSettings";
import {
  type InputDirectionMode,
  type UserSettings,
  type UserSettingsBooleanPaths,
  type UserSettingsState,
} from "../userSettings/userSettingsSlice";

const selectUserSetting =
  <Path extends Paths<UserSettings>>(path: Path) =>
  (state: GameRootState): NonNullable<Get<UserSettings, Path>> => {
    try {
      return (
        getAtPath(state.userSettings.userSettings, path) ??
        getAtPath(defaultUserSettings, path)
      );
    } catch (e) {
      throw new Error(
        `error getting user setting ${path} while settings are ${JSON.stringify(state.userSettings)}`,
        { cause: e },
      );
    }
  };

export const selectInputAssignment = selectUserSetting("inputAssignment");

export const selectIsPaused = (state: GameRootState) => {
  const [topMenu] = state.gameMenus.openMenus;
  if (topMenu === undefined) {
    return false;
  }
  // the death dialog showing is a special case, it isn't considered paused since the game runs very slowly still
  // while this dialog is showing
  return topMenu.menuId !== "death";
};

export const useCheatsOn = (): boolean =>
  useAppSelector((state) => state.debug.cheatsOn);

export const selectIsAssigningKeys = (state: GameRootState): boolean =>
  state.userSettings.assigningInput !== undefined;

export const useIsAssigningKeys = (): boolean =>
  useAppSelector(selectIsAssigningKeys);

/**
 * selects the name of the current key assignment preset (if any is being used)
 */
export const selectCurrentInputPreset = (
  state: GameRootState,
): KeyAssignmentPresetName | undefined => {
  if (state.userSettings.userSettings.inputAssignment === undefined) {
    // having no settings is the same as having the default preset:
    return "Default";
  }

  for (const [name, preset] of objectEntriesIter(keyAssignmentPresets)) {
    if (
      nanoEqual(
        preset.inputAssignment,
        state.userSettings.userSettings.inputAssignment,
      )
    ) {
      return name;
    }
  }

  // is set, but not to any of the presets:
  return undefined;
};

export const useIsGameRunning = () =>
  useAppSelector(
    (state: GameRootState): boolean => state.gameInPlay.gameRunning,
  );

export const selectShowFps = selectUserSetting("showFps");
export const selectEmulatedResolutionName = selectUserSetting(
  "displaySettings.emulatedResolution",
);
export const selectGameSpeed = selectUserSetting("gameSpeed");
export const useEmulatedResolutionName = () =>
  useAppSelector(selectEmulatedResolutionName);

const selectIsUncolourised = (state: GameRootState): boolean =>
  selectSpritesOption(state).uncolourised;

export const useSpritesOption = () => useAppSelector(selectSpritesOption);

export const useIsUncolourised = () => useAppSelector(selectIsUncolourised);
export const selectIsCrtFilter = selectUserSetting("displaySettings.crtFilter");
export const selectIsInfiniteLivesPoke = selectUserSetting(
  "pokesEnabled.infiniteLives",
);
export const selectIsInfiniteDoughnutsPoke = selectUserSetting(
  "pokesEnabled.infiniteDoughnuts",
);

export const selectHasAllPlanetCrowns = (state: GameRootState) => {
  return (
    state.gameInPlay.gameInPlay.planetsLiberated.egyptus &&
    state.gameInPlay.gameInPlay.planetsLiberated.bookworld &&
    state.gameInPlay.gameInPlay.planetsLiberated.penitentiary &&
    state.gameInPlay.gameInPlay.planetsLiberated.safari
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

export const selectPlanetsLiberatedCount = (state: GameRootState) =>
  size(
    valuesIter(state.gameInPlay.gameInPlay.planetsLiberated).filter(Boolean),
  );

export const selectSpritesOption = selectUserSetting("displaySettings.sprites");

const selectShowBoundingBoxTypes = selectUserSetting(
  "displaySettings.showBoundingBoxTypes",
);

export const selectShowBoundingBoxTypesSet = createSelector(
  [selectShowBoundingBoxTypes],
  (types): ReadonlySet<ItemInPlayType> => new Set(types),
);

export const useShowBoundingBoxTypes = (): ItemInPlayType[] => {
  return useAppSelector(selectShowBoundingBoxTypes);
};

const selectShowRoomScrollBounds = selectUserSetting(
  "displaySettings.showRoomScrollBounds",
);

export const useShowRoomScrollBounds = (): boolean => {
  return useAppSelector(selectShowRoomScrollBounds);
};

const selectShowShadowMasks = selectUserSetting(
  "displaySettings.showShadowMasks",
);
export const useShowShadowMasks = (): boolean => {
  return useAppSelector(selectShowShadowMasks);
};

export const selectShowSubrooms = selectUserSetting(
  "displaySettings.showSubrooms",
);
export const useShowSubrooms = (): boolean => {
  return useAppSelector(selectShowSubrooms);
};

const selectUserPreferenceOnScreenControls =
  selectUserSetting("onScreenControls");

export const selectIsSoundMuted = selectUserSetting("soundSettings.mute");
export const selectIsNoFootstepSounds = selectUserSetting(
  "soundSettings.noFootsteps",
);
export const selectRoomEntryTunes = selectUserSetting(
  "soundSettings.roomEntryTunes",
);

export const selectShouldRenderOnScreenControls = ({
  userSettings,
}: GameRootState): boolean =>
  userSettings.userSettings.onScreenControls ??
  defaultUserSettings.onScreenControls;

export const useIsUserPreferenceOnScreenControls = () => {
  return useAppSelector(selectUserPreferenceOnScreenControls);
};

export const selectBooleanUserSetting = (
  state: UserSettingsState | WritableDraft<UserSettingsState>,
  path: UserSettingsBooleanPaths,
): boolean => {
  return !!(
    getAtPath(state.userSettings, path) ??
    getAtPath(defaultUserSettings, path) ??
    false
  );
};

export const useRoomsExplored = <RoomId extends string>() => {
  return useAppSelector(
    (state) =>
      state.gameInPlay.gameInPlay.roomsExplored as Record<RoomId, true>,
  );
};

export const selectCurrentCampaign = <RoomId extends string = string>(
  state: GameRootState,
): Campaign<RoomId> => {
  const maybeCampaign = selectMaybeCurrentCampaign<RoomId>(state);
  if (!maybeCampaign) {
    throw new Error(
      `No current campaign. Campaign locator is:\n${JSON.stringify(state.gameInPlay.gameInPlay.campaignLocator, null, 2)}`,
    );
  }
  return maybeCampaign;
};

export const useCurrentCampaign = selectorHook(selectCurrentCampaign) as <
  T extends string,
>() => Campaign<T>;

export const selectMaybeCurrentCampaign = <RoomId extends string = string>(
  state: GameRootState,
): Campaign<RoomId> | undefined => {
  const currentCampaignLocator = state.gameInPlay.gameInPlay.campaignLocator;
  return currentCampaignLocator === undefined ? undefined : (
      selectMaybeLoadedCampaignData<RoomId>(state, currentCampaignLocator)
    );
};

/**
 * caching selector to get the spritesheet data for the currently
 * selected spritesOption
 */
const selectCurrentSpritesheetData = createSelector(
  [selectSpritesOption],
  (spriteOption): AppSpritesheetData =>
    makeSpritesheetData(spritesheetMetas[spriteOption.name]),
);

export const useCurrentSpritesheetData = () =>
  useAppSelector(selectCurrentSpritesheetData);
