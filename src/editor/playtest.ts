import { editorStore } from "../store/store";
import { openPlaytest, playtestUrl } from "./playtestUrl";
import {
  commitPendingNudge,
  selectPlaytestOptions,
} from "./slice/levelEditorSlice";

/** play the campaign in the game, with the editor's playtest options */
export const playtest = async () => {
  // nudges still being previewed are played too:
  editorStore.dispatch(commitPendingNudge());
  const state = editorStore.getState();
  openPlaytest(await playtestUrl(state, selectPlaytestOptions(state)));
};
