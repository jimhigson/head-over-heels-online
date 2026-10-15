import { type TypedURLSearchParams } from "../../options/queryParams";
import { editorStore } from "../../store/store";

/** put a link that plays the campaign (as last saved) on the clipboard */
export const copyCampaignShareLink = async () => {
  const { userId, campaignName } =
    editorStore.getState().levelEditor.campaignInProgress.locator;
  if (userId === undefined) {
    throw new Error("no user id on supabase session");
  }
  if (campaignName === undefined) {
    throw new Error("an unsaved campaign has no link to share");
  }

  const url = new URL(import.meta.env.VITE_GAME_URL);
  const searchParams = url.searchParams as TypedURLSearchParams;
  searchParams.set("campaignName", campaignName);
  searchParams.set("campaignAuthorUserId", userId);

  await navigator.clipboard.writeText(url.toString());
};
