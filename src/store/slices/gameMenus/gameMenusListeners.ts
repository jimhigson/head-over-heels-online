import { startAppListening } from "../../listenerMiddleware";
import {
  crownCollected,
  gameOver,
  gameStarted,
  lostAllLives,
  lostLife,
  reincarnationAccepted,
  scrollRead,
} from "../gameInPlay/gameInPlaySlice";
import { defaultUserSettings } from "../userSettings/defaultUserSettings";
import {
  crownsMenuShown,
  deathDialogShown,
  gameEndedMenusOpened,
  gameStartedMenusOpened,
  reincarnationRestartMenuShown,
  scrollContentMenuShown,
} from "./gameMenusSlice";

/**
 * Listeners that translate gameInPlay action effects into menu-state writes.
 *
 * Each listener fires after the gameInPlaySlice reducer runs, so it sees
 * post-write state via `getState()`. The listener computes the
 * gameInPlay-side context (planets liberated, mute setting, etc.) and
 * dispatches a specifically named gameMenus action that owns the
 * menu-stack shape.
 */
export const registerGameMenusListeners = () => {
  // scrollRead → open the markdown menu for the scroll's content
  startAppListening({
    actionCreator: scrollRead,
    effect(action, { dispatch }) {
      dispatch(scrollContentMenuShown(action.payload));
    },
  });

  // crownCollected → open the crowns (and possibly proclaimEmperor) menu
  startAppListening({
    actionCreator: crownCollected,
    effect(_action, { dispatch, getState }) {
      const { gameInPlay, userSettings } = getState();
      const allCrowns = Object.values(
        gameInPlay.gameInPlay.planetsLiberated,
      ).every((b) => b);

      const muted =
        userSettings.userSettings.soundSettings.mute ??
        defaultUserSettings.soundSettings.mute;

      dispatch(crownsMenuShown({ playMusic: !muted, allCrowns }));
    },
  });

  // gameStarted → reset the menu stack (empty or the crowns intro)
  startAppListening({
    actionCreator: gameStarted,
    effect(action, { dispatch }) {
      dispatch(
        gameStartedMenusOpened({ showCrowns: !action.payload.noShowCrowns }),
      );
    },
  });

  // lostAllLives → if a reincarnation point exists, offer it; otherwise
  // cascade into gameOver to end the game permanently.
  startAppListening({
    actionCreator: lostAllLives,
    effect(_action, { dispatch, getState }) {
      const offerReincarnation =
        getState().gameInPlay.gameInPlay.reincarnationPoint !== undefined;
      if (offerReincarnation) {
        dispatch(gameEndedMenusOpened({ offerReincarnation: true }));
      } else {
        dispatch(gameOver({ reincarnationDeclined: false }));
      }
    },
  });

  // gameOver → game has ended permanently; show score + non-closable
  // mainMenu, except after declining reincarnation, when the score has
  // already been shown and we go straight to the mainMenu.
  startAppListening({
    actionCreator: gameOver,
    effect(action, { dispatch }) {
      dispatch(
        gameEndedMenusOpened({
          offerReincarnation: false,
          scoreAlreadyShown: action.payload.reincarnationDeclined,
        }),
      );
    },
  });

  // lostLife → show the death dialog
  startAppListening({
    actionCreator: lostLife,
    effect(action, { dispatch }) {
      dispatch(deathDialogShown(action.payload.deathMenuParam));
    },
  });

  // reincarnationAccepted → show the reincarnated-restart menu
  startAppListening({
    actionCreator: reincarnationAccepted,
    effect(_action, { dispatch }) {
      dispatch(reincarnationRestartMenuShown());
    },
  });
};
