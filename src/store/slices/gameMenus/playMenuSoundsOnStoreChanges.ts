import { audioCtx } from "../../../sound/audioCtx";
import { loadAndDecode } from "../../../sound/loadAndDecode";
import { soundUrls } from "../../../sound/soundUrls";
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

  let menuBuffer: AudioBuffer | undefined;
  let scrollOpenBuffer: AudioBuffer | undefined;

  loadAndDecode(soundUrls.menuSofter).then((b) => (menuBuffer = b));
  loadAndDecode(soundUrls.scrollOpen).then((b) => (scrollOpenBuffer = b));

  const play = (buffer: AudioBuffer | undefined, volume: number) => {
    if (buffer === undefined) return;
    const gain = audioCtx.createGain();
    gain.gain.value = volume;
    gain.connect(audioCtx.destination);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(gain);
    source.start();
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

      if (selectIsSoundMuted(getState())) return;

      if (currentMenus.length !== previousMenus.length) {
        const isScrollOpen =
          currentMenus.length === 1 &&
          currentMenus[0].menuId.startsWith("markdown/");
        play(isScrollOpen ? scrollOpenBuffer : menuBuffer, enterExitVolume);
        return;
      }

      // same stack length — check for selection change within the top menu
      if (currentMenus.length === 0) return;
      if (currentMenus[0].menuId !== previousMenus[0].menuId) return;
      if (previousMenus[0].focussedItemId === undefined) return;
      if (currentMenus[0].focussedItemId === previousMenus[0].focussedItemId)
        return;

      play(menuBuffer, scrollVolume);
    },
  });
};
