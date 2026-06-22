import { produce } from "immer";

import { entries } from "../../../../utils/entries";
import { type Xyz } from "../../../../utils/vectors/vectors";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJson";
import { completeTimesXyz, optimiseTimesXyz } from "../../../times";
import { type JsonItemUnion } from "../../JsonItem";
import { type CampaignVerifier } from "../CampaignVerification";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
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
 * whether the stored `times` is entirely 1s, so it could be dropped. Floors are
 * excluded: their `times` is required (it sizes the floor), so a 1×1 floor's
 * `times: {x:1, y:1}` is meaningful, not redundant.
 */
const isRedundantTimes = (item: CampaignJsonItem): boolean => {
  if (item.type === "floor") {
    return false;
  }
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
          itemId: itemId as VerificationRoomItemId,
          msg: `Item ‘${itemId}’ in ‘${roomId}’ has a times of all 1s, which has no effect`,
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
