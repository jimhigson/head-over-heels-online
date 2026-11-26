import { produce } from "immer";

import { entries } from "../../../../utils/entries";
import type { Xyz } from "../../../../utils/vectors/vectors";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJsonItemIterators";
import { completeTimesXyz, optimiseTimesXyz } from "../../../times";
import type { JsonItemUnion } from "../../JsonItem";
import type { CampaignVerifier } from "../CampaignVerification";
import { itemIdMd, valueMd } from "../helpers/messageMarkdown";
import type {
  VerificationRoomId,
  VerificationRoomItemId,
} from "../verificationTypes";

type RedundantTimes = {
  roomId: VerificationRoomId;
  itemId: VerificationRoomItemId;
};

/** a campaign room's items carry plain-`string` ids */
type CampaignJsonItem = JsonItemUnion<VerificationRoomId, string>;

/** the literal `times` stored on an item's config, if any (not the implied wall length) */
const storedTimes = (item: CampaignJsonItem): Partial<Xyz> | undefined =>
  (item.config as { times?: Partial<Xyz> }).times;

/**
 * whether the stored `times` is entirely 1s, so it could be dropped
 */
const isRedundantTimes = (item: CampaignJsonItem): boolean => {
  const times = storedTimes(item);
  return (
    times !== undefined &&
    optimiseTimesXyz(completeTimesXyz(times)) === undefined
  );
};

/**
 * an item carrying a `times` of all 1s, which is the default - it bloats the
 * JSON with no effect.
 */
export const redundantTimesVerifier: CampaignVerifier<RedundantTimes> = {
  name: "Redundant item times",
  *check(campaign) {
    for (const [roomId, room] of entries(campaign.rooms)) {
      for (const [itemId, item] of iterateRoomJsonItemsWithIds(room.items)) {
        if (!isRedundantTimes(item)) {
          continue;
        }
        yield {
          severity: "warning",
          roomId,
          itemIds: [itemId as VerificationRoomItemId],
          msg: `Item ‘${itemIdMd(itemId)}’ in ‘${valueMd(roomId)}’ has a times of all 1s, which has no effect`,
          fixable: true,
          fixText: `Remove the redundant times from item ‘${itemId}’ in ‘${roomId}’`,
          issueData: { roomId, itemId: itemId as VerificationRoomItemId },
          verifier: redundantTimesVerifier,
        };
      }
    }
  },
  fix(campaign, { roomId, itemId }) {
    const item = campaign.rooms[roomId].items[itemId];
    if (!isRedundantTimes(item)) {
      throw new Error(
        `cannot auto-fix times on item ‘${itemId}’ in ‘${roomId}’: it isn't redundant`,
      );
    }
    return produce(campaign, (draft) => {
      const draftItem = draft.rooms[roomId].items[itemId];
      delete (draftItem.config as { times?: Partial<Xyz> }).times;
    });
  },
};
