import { campaignToDataParam } from "../db/campaignToDataParam";
import { type TypedURLSearchParams } from "../options/queryParams";
import { type EditorRootState } from "../store/store";
import { selectCursorRoomId } from "./slice/levelEditorSelectors";
import { selectCurrentCampaignInProgress } from "./slice/levelEditorSlice";

/** the game url that plays the editor's open campaign, unsaved */
export const playtestUrl = async (
  state: EditorRootState,
  {
    baseUrl,
    fromStart,
    playAsHeels,
  }: {
    /** the game to open the campaign in */
    baseUrl: string;
    /** start at the campaign's start, not the editor's current room */
    fromStart: boolean;
    playAsHeels: boolean;
  },
): Promise<string> => {
  const url = new URL(baseUrl, window.location.href);
  const searchParams = url.searchParams as TypedURLSearchParams;
  searchParams.set(
    "campaignName",
    await campaignToDataParam(selectCurrentCampaignInProgress(state)),
  );
  searchParams.set("cheats", "1");
  if (playAsHeels) {
    searchParams.set("playAsHeels", "1");
  }
  if (!fromStart) {
    url.hash = selectCursorRoomId(state.levelEditor);
  }
  return url.toString();
};

/**
 * open (or restart) the game in a fresh `playtest` tab. Any open one is closed
 * first: the same url again would only be a same-document hash change, not a
 * new game. `undefined` if the browser blocked the tab
 */
export const openPlaytest = (url: string): undefined | Window => {
  // an empty url finds the open playtest tab without navigating it:
  window.open("", "playtest")?.close();
  return window.open(url, "playtest") ?? undefined;
};
