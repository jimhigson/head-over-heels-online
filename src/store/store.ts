import { zxSpectrumResolution as originalSystemRes } from "@/originalGame";
import { menus, type MenuId } from "@/game/components/dialogs/menu/mainMenu";
import { calculateUpscale, type Upscale } from "@/game/render/upscale";
import type { ShowBoundingBoxes } from "@/game/RenderOptions";
import type { PayloadAction } from "@reduxjs/toolkit";
import { configureStore, createSlice } from "@reduxjs/toolkit";

export type OpenMenu = {
  menuId: MenuId;
  selectedIndex: number;
};

export type GameMenusState = {
  onHold: boolean;
  upscale: Upscale;
  showBoundingBoxes: ShowBoundingBoxes;
  showShadowMasks: boolean;
  /**
   * stack of menus currently open - empty if none are
   */
  menus: OpenMenu[];
  /**
   * the markdown content of the currently displayed scroll, or null
   * when none
   */
  scrollContent: string | null;
};

const initialState: GameMenusState = {
  onHold: false,
  upscale: calculateUpscale(
    { x: window.innerWidth, y: window.innerHeight },
    originalSystemRes,
  ),
  showBoundingBoxes: "none",
  showShadowMasks: false,
  menus: [],
  scrollContent: null,
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
const gameMenusSlice = createSlice({
  name: "gameMenus",
  initialState,
  reducers: {
    setUpscale(state, { payload: upscale }: PayloadAction<Upscale>) {
      state.upscale = upscale;
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
    pushMenu(state) {
      const [{ menuId, selectedIndex }] = state.menus;
      const menu = menus[menuId];
      const selectedMenuItem = menu.items[selectedIndex];

      if (selectedMenuItem.type !== "submenu") {
        throw new Error();
      }

      state.menus = [
        { menuId: selectedMenuItem.submenu, selectedIndex: 0 },
        ...state.menus,
      ];
    },
    popMenu(state) {
      if (state.menus.length < 1) {
        throw new Error();
      }

      const [, ...tail] = state.menus;
      state.menus = tail;
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
      state.showBoundingBoxes = showBoundingBoxes;
    },
    setShowShadowMasks(
      state,
      { payload: showShadowMasks }: PayloadAction<boolean>,
    ) {
      state.showShadowMasks = showShadowMasks;
    },
  },
});

export const {
  setUpscale,
  showScroll,
  closeScroll,
  pushMenu,
  popMenu,
  menuDown,
  menuPressed,
  menuUp,
  onHoldPressed,
  setShowBoundingBoxes,
  setShowShadowMasks,
} = gameMenusSlice.actions;

export const store = configureStore({
  reducer: gameMenusSlice.reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
