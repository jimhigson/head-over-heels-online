import { produce } from "immer";

import { entries } from "../../../../utils/entries";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJsonItemIterators";
import type {
  VerificationCampaign,
  VerificationRoomId,
  VerificationRoomItemId,
} from "../verificationTypes";

export type InlineScroll = {
  roomId: VerificationRoomId;
  itemId: VerificationRoomItemId;
  /**
   * the scroll's markdown - one string per paragraph when written as an array
   */
  markdowns: readonly string[];
};

/**
 * every scroll in the campaign whose markdown is written into the campaign
 * itself, rather than being a page of the manual
 */
export function* inlineScrolls(
  campaign: VerificationCampaign,
): Generator<InlineScroll> {
  for (const [roomId, room] of entries(campaign.rooms)) {
    for (const [itemId, pickup] of iterateRoomJsonItemsWithIds(
      room.items,
      "pickup",
    )) {
      if (
        pickup.config.gives === "scroll" &&
        pickup.config.source === "inline"
      ) {
        const { markdown } = pickup.config;
        yield {
          roomId,
          itemId,
          markdowns: typeof markdown === "string" ? [markdown] : markdown,
        };
      }
    }
  }
}

/**
 * the campaign with one inline scroll's markdown changed, paragraph by
 * paragraph. Throws if the item is not an inline scroll, or nothing changed
 */
export const withInlineScrollMarkdownMapped = (
  campaign: VerificationCampaign,
  roomId: VerificationRoomId,
  itemId: VerificationRoomItemId,
  mapMarkdown: (markdown: string) => string,
): VerificationCampaign => {
  const mappedCampaign = produce(campaign, (draft) => {
    const item = draft.rooms[roomId].items[itemId];
    if (
      item.type !== "pickup" ||
      item.config.gives !== "scroll" ||
      item.config.source !== "inline"
    ) {
      throw new Error(
        `item ‘${itemId}’ in ‘${roomId}’ is not a scroll with inline markdown`,
      );
    }
    const { config } = item;
    if (typeof config.markdown === "string") {
      config.markdown = mapMarkdown(config.markdown);
    } else {
      for (const [index, markdown] of config.markdown.entries()) {
        config.markdown[index] = mapMarkdown(markdown);
      }
    }
  });
  if (mappedCampaign === campaign) {
    throw new Error(
      `the markdown of scroll ‘${itemId}’ in ‘${roomId}’ has nothing to change`,
    );
  }
  return mappedCampaign;
};
