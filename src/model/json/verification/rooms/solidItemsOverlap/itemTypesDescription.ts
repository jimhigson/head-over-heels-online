import { valueMd, withArticle } from "../../helpers/messageMarkdown";
import type {
  VerificationRoomItemId,
  VerificationRoomJson,
} from "../../verificationTypes";

/**
 * what a pair of items are, in the order given - "two *wall* items" when they
 * are the same type, otherwise eg "a *block* and a *monster* item"
 */
export const itemTypesDescription = (
  room: VerificationRoomJson,
  [itemId, otherItemId]: [VerificationRoomItemId, VerificationRoomItemId],
): string => {
  const itemType = room.items[itemId].type;
  const otherItemType = room.items[otherItemId].type;
  return itemType === otherItemType ?
      `two ${valueMd(itemType)} items`
    : `${withArticle(itemType)} and ${withArticle(otherItemType)} item`;
};
