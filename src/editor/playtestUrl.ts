import { campaignToDataParam } from "../db/campaignToDataParam";
import { type TypedURLSearchParams } from "../options/queryParams";
import { type EditorRootState } from "../store/store";
import { type PlaytestOptions } from "./PlaytestOptions";
import {
  selectCurrentCampaignInProgress,
  selectCursorRoomId,
} from "./slice/levelEditorSlice";

/** the game url that plays the editor's open campaign, unsaved */
export const playtestUrl = async (
  state: EditorRootState,
  { baseUrl, fromStart, playAsHeels }: PlaytestOptions,
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
    url.hash = selectCursorRoomId(state);
  }
  return url.toString();
};

/**
 * open the game in a new tab, without an opener, so the game runs in its own
 * process
 */
export const openPlaytest = (url: string): void => {
  window.open(url, "_blank", "noopener");
};
