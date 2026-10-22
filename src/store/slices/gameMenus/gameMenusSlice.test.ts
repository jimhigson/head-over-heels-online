import { expect, test } from "vitest";

import { type DialogId } from "../../../game/components/dialogs/menuDialog/DialogId";
import {
  deathDialogShown,
  gameMenusSlice,
  type GameMenusState,
  gameStartedMenusOpened,
  goToSubmenu,
} from "./gameMenusSlice";

const { reducer } = gameMenusSlice;

const openMenuIds = (state: GameMenusState): DialogId[] =>
  state.openMenus.map(({ menuId }) => menuId);

test("an always-on-top menu stays open when the stack beneath it is replaced", () => {
  const state0Initial = reducer(undefined, { type: "init" });
  const state1SmoothingOpen = reducer(
    state0Initial,
    goToSubmenu({
      dialogId: "smoothing",
      openedAt: 0,
      alwaysOnTop: true,
      notDismissable: true,
      showAfterDelayMs: 500,
      lingerMs: 500,
    }),
  );
  const state2GameStarted = reducer(
    state1SmoothingOpen,
    gameStartedMenusOpened({ showCrowns: true, openedAt: 0 }),
  );

  expect<DialogId[]>(openMenuIds(state2GameStarted)).toEqual<DialogId[]>([
    "smoothing",
    "crowns",
  ]);
});

test("two deaths close together queue beneath an always-on-top menu", () => {
  const state0Initial = reducer(undefined, { type: "init" });
  const state1SmoothingOpen = reducer(
    state0Initial,
    goToSubmenu({
      dialogId: "smoothing",
      openedAt: 0,
      alwaysOnTop: true,
      notDismissable: true,
      showAfterDelayMs: 500,
      lingerMs: 500,
    }),
  );
  const state2HeadDied = reducer(
    state1SmoothingOpen,
    deathDialogShown({
      deathMenuParam: {
        dyingCharacterName: "head",
        headLives: 3,
        heelsLives: 3,
      },
      openedAt: 0,
    }),
  );
  const state3HeelsDied = reducer(
    state2HeadDied,
    deathDialogShown({
      deathMenuParam: {
        dyingCharacterName: "heels",
        headLives: 2,
        heelsLives: 3,
      },
      openedAt: 0,
    }),
  );

  expect<DialogId[]>(openMenuIds(state3HeelsDied)).toEqual<DialogId[]>([
    "smoothing",
    "death",
    "death",
  ]);
});
