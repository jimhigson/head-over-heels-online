import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Writable } from "type-fest";

import { type BooleanAction } from "../../../game/input/actions";
import {
  type ActionInputAssignment,
  type InputAssignment,
  type InputPress,
} from "../../../game/input/InputAssignment";
import {
  type KeyAssignmentPresetName,
  keyAssignmentPresets,
} from "../../../game/input/keyAssignmentPresets";
import {
  type ItemInPlayType,
  itemInPlayTypes,
} from "../../../model/ItemInPlay";
import { type ResolutionName, resolutionNames } from "../../../originalGame";
import {
  spriteOptionValues,
  spriteOptionValuesWithDebug,
  type spritesheetMetas,
} from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { getAtPath, setAtPath } from "../../../utils/getAtPath";
import { nextInCycle } from "../../../utils/nextInCycle";
import { type ToggleablePaths } from "../../../utils/Toggleable";
import { directionsXy4 } from "../../../utils/vectors/vectors";
import { clearAllData } from "../clearAllData";
import { defaultUserSettings } from "./defaultUserSettings";
import {
  type DirectionsRelativeToMode,
  directionsRelativeToModes,
} from "./directionsRelativeToModes";
import { emptyUserSettings } from "./emptyUserSettings";
import {
  type SelectableGameSpeeds,
  selectableGameSpeeds,
} from "./selectableGameSpeeds";
import { spriteOptionEquals } from "./spriteOptionEquals";

export type SpriteOptionFor<
  Name extends string,
  SupportsUncolourised extends boolean,
> =
  SupportsUncolourised extends true ?
    { name: Name; uncolourised: false } | { name: Name; uncolourised: true }
  : { name: Name; uncolourised: false };

/**
 * every sprite option, derived from the spritesheet metas: each sheet in
 * colourised form, plus uncolourised where the sheet supports it. Debug is
 * included (cheats-only) since it has a meta
 */
export type SpriteOption = {
  [Name in keyof typeof spritesheetMetas]: SpriteOptionFor<
    Name,
    (typeof spritesheetMetas)[Name]["supportsUncolourised"]
  >;
}[keyof typeof spritesheetMetas];

export type DisplaySettings = {
  emulatedResolution?: ResolutionName;
  crtFilter?: boolean;
  /**
   * upscale the spritesheet with the cleanEdge algorithm, redrawing sprite
   * edges and slopes smoothly at the screen's resolution
   */
  smoothSprites?: boolean;
  showBoundingBoxTypes?: ItemInPlayType[];
  showRoomScrollBounds?: boolean;
  showShadowMasks?: boolean;
  showSubrooms?: boolean;
  sprites?: SpriteOption;
};

export const inputDirectionModes = ["4-way", "8-way", "analogue"] as const;
export type InputDirectionMode = (typeof inputDirectionModes)[number];

export const roomEntryTunesSettings = ["always", "sparse", "never"] as const;
export type RoomEntryTunesSetting = (typeof roomEntryTunesSettings)[number];

export type SoundSettings = {
  mute?: boolean;
  roomEntryTunes?: RoomEntryTunesSetting;
  noFootsteps?: boolean;
};

export type PokesEnabled = {
  infiniteLives?: boolean;
  infiniteDoughnuts?: boolean;
};

export type UserSettings = {
  inputAssignment?: InputAssignment;
  displaySettings: DisplaySettings;
  showFps?: boolean;
  pokesEnabled: PokesEnabled;
  inputDirectionMode?: InputDirectionMode;
  directionsRelativeTo?: DirectionsRelativeToMode;
  onScreenControls?: boolean;
  gameSpeed?: SelectableGameSpeeds;

  // sound options
  soundSettings: SoundSettings;
};

type AssigningInput =
  | {
      action: BooleanAction;
      presses: ActionInputAssignment;
      axes: number[];
    }
  | undefined;

export type UserSettingsState = {
  /*
   * All user settings are optional - if not stated in the store, the selector's
   * job is to use a default instead
   */
  userSettings: UserSettings;

  /**
   * For the key assignment menu, the key currently being assigned
   */
  assigningInput: AssigningInput;
};

export type UserSettingsBooleanPaths = ToggleablePaths<UserSettings>;

const initialUserSettingsSliceState: UserSettingsState = {
  userSettings: emptyUserSettings,
  assigningInput: undefined,
};

const readBooleanUserSetting = (
  userSettings: UserSettings,
  path: UserSettingsBooleanPaths,
): boolean =>
  !!(
    getAtPath(userSettings, path) ??
    getAtPath(defaultUserSettings, path) ??
    false
  );

export const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState: initialUserSettingsSliceState,
  reducers: {
    setEmulatedResolution(
      state,
      { payload }: PayloadAction<null | ResolutionName | undefined>,
    ) {
      if (payload === null) {
        // explicit unset - falls back to default:
        delete state.userSettings.displaySettings.emulatedResolution;
        return;
      }
      const current =
        state.userSettings.displaySettings.emulatedResolution ??
        defaultUserSettings.displaySettings.emulatedResolution;
      state.userSettings.displaySettings.emulatedResolution =
        payload ?? nextInCycle(resolutionNames, current);
    },
    setGameSpeed(
      state,
      { payload }: PayloadAction<SelectableGameSpeeds | undefined>,
    ) {
      const current =
        state.userSettings.gameSpeed ?? defaultUserSettings.gameSpeed;
      state.userSettings.gameSpeed =
        payload ?? nextInCycle(selectableGameSpeeds, current);
    },
    nextInputDirectionMode(state) {
      const current =
        state.userSettings.inputDirectionMode ??
        defaultUserSettings.inputDirectionMode;
      state.userSettings.inputDirectionMode = nextInCycle(
        inputDirectionModes,
        current,
      );
    },
    nextRoomEntryTunes(state) {
      const current =
        state.userSettings.soundSettings.roomEntryTunes ??
        defaultUserSettings.soundSettings.roomEntryTunes;
      state.userSettings.soundSettings.roomEntryTunes = nextInCycle(
        roomEntryTunesSettings,
        current,
      );
    },
    nextDirectionRelativeTo(state) {
      const current =
        state.userSettings.directionsRelativeTo ??
        defaultUserSettings.directionsRelativeTo;
      state.userSettings.directionsRelativeTo = nextInCycle(
        directionsRelativeToModes,
        current,
      );
    },
    setShowBoundingBoxType(
      state,
      {
        payload: { itemType, value },
      }: PayloadAction<{ itemType?: ItemInPlayType; value: boolean }>,
    ) {
      if (itemType === undefined) {
        state.userSettings.displaySettings.showBoundingBoxTypes =
          value ? (itemInPlayTypes as Writable<typeof itemInPlayTypes>) : [];
        return;
      }
      const current =
        state.userSettings.displaySettings.showBoundingBoxTypes ?? [];
      const index = current.indexOf(itemType);
      if (value && index === -1) {
        current.push(itemType);
      } else if (!value && index !== -1) {
        current.splice(index, 1);
      }
      state.userSettings.displaySettings.showBoundingBoxTypes = current;
    },
    setShowShadowMasks(state, { payload }: PayloadAction<boolean>) {
      state.userSettings.displaySettings.showShadowMasks = payload;
    },
    nextSpritesOption(
      state,
      {
        payload,
      }: PayloadAction<
        | {
            /** should we include the debug spritesheet in the cycle? */
            includeDebug: boolean;
          }
        | undefined
      >,
    ) {
      state.userSettings.displaySettings.sprites = nextInCycle(
        payload?.includeDebug ?
          spriteOptionValuesWithDebug
        : spriteOptionValues,
        state.userSettings.displaySettings.sprites ??
          defaultUserSettings.displaySettings.sprites,
        spriteOptionEquals,
      );
    },
    setSpritesOption(state, { payload }: PayloadAction<SpriteOption>) {
      state.userSettings.displaySettings.sprites = payload;
    },
    toggleUserSetting(
      state,
      {
        payload: { path, value },
      }: PayloadAction<{
        path: UserSettingsBooleanPaths;
        value?: boolean;
      }>,
    ) {
      setAtPath(
        state.userSettings,
        path,
        value ?? !readBooleanUserSetting(state.userSettings, path),
      );
    },
    assignInputStart(state, { payload: action }: PayloadAction<BooleanAction>) {
      state.assigningInput = {
        action,
        presses: { gamepadButtons: [], keys: [] },
        axes: [],
      };
    },
    inputAddedDuringAssignment(state, { payload }: PayloadAction<InputPress>) {
      if (state.assigningInput === undefined) {
        throw new Error("reducer called while not assigning keys");
      }

      const addIfUnique = <E>(arr: E[], el: NoInfer<E>) => {
        if (!arr.includes(el)) {
          arr.push(el);
        }
      };

      const { presses: actionInput, axes, action } = state.assigningInput;
      switch (payload.type) {
        case "key":
          addIfUnique(actionInput.keys, payload.input);
          break;
        case "gamepadButtons":
          addIfUnique(actionInput.gamepadButtons, payload.input);
          break;
        case "gamepadAxes": {
          const actionCanHaveAxisAssigned = (
            directionsXy4 as Readonly<string[]>
          ).includes(action);

          if (actionCanHaveAxisAssigned) {
            addIfUnique(axes, payload.input);
          }
          break;
        }
        default:
          payload satisfies never;
      }
    },
    doneAssigningInput(state) {
      if (state.assigningInput === undefined) {
        throw new Error("illegal action for state");
      }
      const { action, presses: actionInput, axes } = state.assigningInput;

      const totalInputs =
        actionInput.keys.length +
        actionInput.gamepadButtons.length +
        axes.length;

      const inputAssignment: InputAssignment =
        state.userSettings.inputAssignment === undefined ?
          (state.userSettings.inputAssignment = structuredClone(
            keyAssignmentPresets.Default.inputAssignment,
          ))
        : state.userSettings.inputAssignment;

      if (totalInputs > 0) {
        inputAssignment.presses[action] = actionInput;
        if (action === "left" || action === "right") {
          inputAssignment.axes.x = axes;
        }
        if (action === "towards" || action === "away") {
          inputAssignment.axes.y = axes;
        }
      }
      state.assigningInput = undefined;
    },
    /**
     * Applies a named key-assignment preset to userSettings.inputAssignment.
     * The menu-pop dispatch is the responsibility of the caller (sibling
     * dispatch of `backToParentMenu`) so this reducer stays intra-slice.
     */
    keyAssignmentPresetApplied(
      state,
      { payload: presetName }: PayloadAction<KeyAssignmentPresetName>,
    ) {
      state.userSettings.inputAssignment =
        keyAssignmentPresets[presetName].inputAssignment;
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialUserSettingsSliceState);
  },
});

export const {
  assignInputStart,
  doneAssigningInput,
  inputAddedDuringAssignment,
  keyAssignmentPresetApplied,
  nextDirectionRelativeTo,
  nextInputDirectionMode,
  nextRoomEntryTunes,
  nextSpritesOption,
  setEmulatedResolution,
  setGameSpeed,
  setShowBoundingBoxType,
  setShowShadowMasks,
  setSpritesOption,
  toggleUserSetting,
} = userSettingsSlice.actions;
