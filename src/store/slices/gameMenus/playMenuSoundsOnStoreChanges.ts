import { type ExportedSoundId } from "../../../_generated/sfxdex/sfx";
import { audioCtx } from "../../../sound/audioCtx";
import { connectWithGain } from "../../../sound/soundUtils/connectWithGain";
import { createAudioNode } from "../../../sound/soundUtils/createAudioNode";
import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";
import { startAppListening } from "../../listenerMiddleware";
import { selectIsSoundMuted } from "./gameMenusSelectors";

const scrollVolume = 0.07;
const enterExitVolume = 0.3;

export const playMenuSoundsOnStoreChanges = () => {
  if (detectDeviceType() === "server") {
    // the server doesn't support sound, the AudioContext will be undefined
    // and it would fail
    return;
  }

  let lastPlayTime = 0;
  const minIntervalMs = 200;

  const play = (soundId: ExportedSoundId, volume: number) => {
    const now = performance.now();
    if (now - lastPlayTime < minIntervalMs) {
      return;
    }
    lastPlayTime = now;

    // assumes the sound is loaded - loadedSound (inside createAudioNode) throws
    // if it isn't yet
    const source = createAudioNode(soundId);
    connectWithGain(source, { soundId, gain: volume }, audioCtx.destination);
  };

  startAppListening({
    predicate(_action, currentState, previousState) {
      return (
        currentState.gameMenus.openMenus !== previousState.gameMenus.openMenus
      );
    },
    effect(_action, { getState, getOriginalState }) {
      const currentMenus = getState().gameMenus.openMenus;
      const previousMenus = getOriginalState().gameMenus.openMenus;

      if (selectIsSoundMuted(getState())) {
        return;
      }

      if (currentMenus.length !== previousMenus.length) {
        const isScrollOpen =
          currentMenus.length === 1 &&
          currentMenus[0].menuId.startsWith("markdown/");
        play(isScrollOpen ? "scrollOpen" : "menuSofter", enterExitVolume);
        return;
      }

      // same stack length — check for selection change within the top menu
      if (currentMenus.length === 0) {
        return;
      }
      if (currentMenus[0].menuId !== previousMenus[0].menuId) {
        return;
      }
      if (previousMenus[0].focussedItemId === undefined) {
        return;
      }
      if (currentMenus[0].focussedItemId === previousMenus[0].focussedItemId) {
        return;
      }

      play("menuSofter", scrollVolume);
    },
  });
};
