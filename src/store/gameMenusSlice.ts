import { zxSpectrumResolution } from "@/originalGame";
import { menus, type MenuId } from "@/game/components/dialogs/menuDialog/menus";
import { calculateUpscale, type Upscale } from "@/game/render/calculateUpscale";
import type { RenderOptions, ShowBoundingBoxes } from "@/game/RenderOptions";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { InputAssignment } from "@/game/input/InputState";
import { keyAssignmentPresets } from "@/game/input/keyAssignmentPresets";
import type { ValueOf } from "type-fest";
import type { Xy } from "@/utils/vectors/vectors";

export type OpenMenu = {
  menuId: MenuId;
  selectedIndex: number;
};

export type GameMenusState = {
  onHold: boolean;

  readerOptions: RenderOptions;

  emulatedResolution: Xy;

  /**
   * stack of menus currently open - empty if none are
   */
  menus: OpenMenu[];
  /**
   * the markdown content of the currently displayed scroll, or null
   * when none
   */
  scrollContent: string | null;
  inputAssignment: InputAssignment;
};

const initialState: GameMenusState = {
  onHold: false,
  readerOptions: {
    upscale: calculateUpscale(
      { x: window.innerWidth, y: window.innerHeight },
      zxSpectrumResolution,
    ),
    showBoundingBoxes: "none",
    showShadowMasks: false,
    crtFilter: true,
    colourise: true,
  },
  emulatedResolution: zxSpectrumResolution,
  menus: [],
  scrollContent: null,
  inputAssignment: keyAssignmentPresets.default.inputAssignment,
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const gameMenusSlice = createSlice({
  name: "gameMenus",
  initialState,
  reducers: {
    setUpscale(state, { payload: upscale }: PayloadAction<Upscale>) {
      state.readerOptions.upscale = upscale;
    },
    setEmulatedResolution(
      state,
      { payload: emulatedResolution }: PayloadAction<Xy>,
    ) {
      state.emulatedResolution = emulatedResolution;
    },
    showScroll(state, { payload: scrollContent }: PayloadAction<string>) {
      state.scrollContent = scrollContent;
    },
    closeScroll(state) {
      state.scrollContent = null;
    },
    menuPressed(state) {
      if (state.menus.length > 0) {
        const [, ...tail] = state.menus;
        state.menus = tail;
      } else {
        state.menus = [{ menuId: "mainMenu", selectedIndex: 0 }];
        state.onHold = false;
        state.scrollContent = null;
      }
    },
    menuItemSelected(state) {
      const [{ menuId, selectedIndex }] = state.menus;
      const menu = menus[menuId];
      const selectedMenuItem = menu.items[selectedIndex];

      switch (selectedMenuItem.type) {
        case "submenu":
          state.menus = [
            { menuId: selectedMenuItem.submenu, selectedIndex: 0 },
            ...state.menus,
          ];
          break;
        case "keyPreset": {
          const [, ...tail] = state.menus;
          state.menus = tail;
          (state as GameMenusState).inputAssignment =
            keyAssignmentPresets[selectedMenuItem.preset].inputAssignment;
          break;
        }
        case "switch":
          // we rely on the listener api to pick this up and re-dispatch the appropriate action
          break;
        case "toGame":
          state.menus = [];
          break;
        case "todo":
          // not implemented - do nothing
          break;
      }
    },
    menuDown(state) {
      const [{ selectedIndex, menuId }, ...tail] = state.menus;
      const menu = menus[menuId];
      state.menus = [
        {
          menuId,
          selectedIndex: (selectedIndex + 1) % menu.items.length,
        },
        ...tail,
      ];
    },
    menuUp(state) {
      const [{ selectedIndex, menuId }, ...tail] = state.menus;
      const menu = menus[menuId];
      state.menus = [
        {
          menuId,
          selectedIndex:
            (selectedIndex - 1 + menu.items.length) % menu.items.length,
        },
        ...tail,
      ];
    },
    onHoldPressed(state) {
      if (state.menus.length > 0 && !state.onHold) {
        // do nothing if paused pressed while in menus
        return;
      }

      state.onHold = !state.onHold;
    },
    setShowBoundingBoxes(
      state,
      { payload: showBoundingBoxes }: PayloadAction<ShowBoundingBoxes>,
    ) {
      state.readerOptions.showBoundingBoxes = showBoundingBoxes;
    },
    setShowShadowMasks(
      state,
      { payload: showShadowMasks }: PayloadAction<boolean>,
    ) {
      state.readerOptions.showShadowMasks = showShadowMasks;
    },
    toggleCrtFilter(state) {
      state.readerOptions.crtFilter = !state.readerOptions.crtFilter;
    },
    toggleColourise(state) {
      state.readerOptions.colourise = !state.readerOptions.colourise;
    },
  },
});

export type GameMenusSliceAction = ReturnType<
  ValueOf<typeof gameMenusSlice.actions>
>;

export const {
  setUpscale,
  showScroll,
  closeScroll,
  menuItemSelected,
  menuDown,
  menuPressed,
  menuUp,
  onHoldPressed,
  setShowBoundingBoxes,
  setShowShadowMasks,
  toggleColourise,
  toggleCrtFilter,
} = gameMenusSlice.actions;
