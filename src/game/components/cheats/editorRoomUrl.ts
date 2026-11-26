import type { CampaignLocator } from "../../../model/modelTypes";
import type { TypedURLSearchParams } from "../../../options/queryParams";

/**
 * the editor url that opens a room of the latest version of a campaign
 */
export const editorRoomUrl = <RoomId extends string>(
  /**
   * where the editor is served from, absolute or relative to this page
   */
  editorBaseUrl: string,
  { userId, campaignName }: CampaignLocator,
  roomId: RoomId,
): string => {
  const url = new URL(editorBaseUrl, window.location.href);
  const searchParams = url.searchParams as TypedURLSearchParams;
  searchParams.set("campaignName", campaignName);
  searchParams.set("campaignAuthorUserId", userId);
  url.hash = encodeURIComponent(roomId);
  return url.toString();
};
