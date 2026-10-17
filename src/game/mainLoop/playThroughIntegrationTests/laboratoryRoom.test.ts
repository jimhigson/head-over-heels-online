import { expect, test } from "vitest";

import { setupGameForCampaign } from "../../../_testUtils/basicRoom";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { loadCampaignFromDb } from "../../../db/campaign";
import { postgrestDb } from "../../../db/postgrestDb";
import { jimAtBlockstackingUserId } from "../../../gameInfo";
import { itemBehaviourKey } from "../../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { iterateRoomItemEntries } from "../../../model/roomItemsInPlayIterators";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { omit } from "../../../utils/pick";

/**
 * the item reduced to its outcome: what is fixed from loading, and bookkeeping
 * (which can change without anything that matters in the room changing, so
 * would give false positives), are dropped
 */
const sanitiseItem = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
) => ({
  // fixed from loading, or (the behaviour) stateless:
  ...omit(item, "hash", itemBehaviourKey),
  state: omit(
    item.state,
    "movedOrResizedOnProgression",
    "stoodOnUntilRoomTime",
    "standingOnUntilRoomTime",
    "previousStandingOnItemId",
    "liftVel",
    "latentMovement",
    "timeOfLastDirectionChange",
    "durationOfTouch",
  ),
});

// the latest version, so the test follows the room as it is edited:
const laboratoryCampaign = await loadCampaignFromDb(postgrestDb, {
  userId: jimAtBlockstackingUserId,
  campaignName: "laboratory",
});

/** the room reduced to its outcome, as a plain object for a snapshot */
const sanitiseRoomState = <RoomId extends string, RoomItemId extends string>(
  room: RoomState<RoomId, RoomItemId>,
) => ({
  // the spatial index needn't be identical before/after:
  ...omit(room, "progression", "items", roomSpatialIndexKey),
  items: Object.fromEntries(
    iterateRoomItemEntries(room.items).map(([id, item]) => [
      id,
      sanitiseItem(item),
    ]),
  ),
});

test(
  'playing through a complex, deterministic room ("laboratory") should always give the same results after a fixed amount of time',
  { timeout: 60_000 },
  () => {
    const gameState = setupGameForCampaign(laboratoryCampaign);

    playGameThrough(gameState, {
      until: 30_000, // half a minute
    });

    // fine to update this snapshot if there are intentional changes
    // to the mechanics etc, but should not change after pure refactoring
    const heelsRoomFinalState = gameState.characterRooms.heels!;

    expect(
      sanitiseRoomState(heelsRoomFinalState),
      `laboratory campaign v${laboratoryCampaign.locator.version} from the db`,
    ).toMatchSnapshot();
  },
);
