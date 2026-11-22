import { entries } from "../../../../../utils/entries";
import {
  type CampaignVerifier,
  notAutoFixable,
} from "../../CampaignVerification";
import { itemIdMd, valueMd } from "../../helpers/messageMarkdown";
import type {
  VerificationRoomId,
  VerificationRoomItemId,
  VerificationRoomJson,
} from "../../verificationTypes";
import { itemTypesDescription } from "./itemTypesDescription";
import { overlappingSolidJsonItemPairs } from "./overlappingSolidJsonItemPairs";

type SolidItemsOverlap = {
  roomId: VerificationRoomId;
  itemIds: [VerificationRoomItemId, VerificationRoomItemId];
};

/**
 * each room's overlapping pairs, kept for as long as that version of the room
 * is - an unchanged room is the same object from one verification to the
 * next, so is only loaded and checked again once it changes
 */
const overlappingPairsOfRoom = new WeakMap<
  VerificationRoomJson,
  [VerificationRoomItemId, VerificationRoomItemId][]
>();

/**
 * two items in a room that are solid to each other, and overlap
 */
export const solidItemsOverlapVerifier: CampaignVerifier<SolidItemsOverlap> = {
  name: "Solid items overlap",
  *check(campaign) {
    for (const [roomId, room] of entries(campaign.rooms)) {
      const pairs = overlappingPairsOfRoom.getOrInsertComputed(room, () =>
        overlappingSolidJsonItemPairs(roomId, room),
      );
      for (const itemIds of pairs) {
        const [itemId, otherItemId] = itemIds;
        yield {
          severity: "error",
          roomId,
          itemIds,
          msg: `${itemTypesDescription(room, itemIds)} in ‘${valueMd(roomId)}’: ‘${itemIdMd(itemId)}’ and ‘${itemIdMd(otherItemId)}’ overlap`,
          fixable: false,
          fixText: `Move ‘${itemId}’ or ‘${otherItemId}’ in ‘${roomId}’ so they don’t overlap`,
          issueData: { roomId, itemIds },
          verifier: solidItemsOverlapVerifier,
        };
      }
    }
  },
  fix() {
    return notAutoFixable();
  },
};
