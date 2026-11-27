import { produce } from "immer";
import { beforeEach, expect, test } from "vitest";

import { setupGameForCampaign } from "../../../_testUtils/basicRoom";
import { headState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { currentRoomIs } from "../../../_testUtils/playThroughUntilHelpers";
import { roomVerticalLink } from "../../../model/RoomJson";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJsonItemIterators";
import { campaign } from "../../../originalCampaign/campaign";
import type { OriginalCampaignRoomId } from "../../../originalCampaign/OriginalCampaignRoomId";
import { entries } from "../../../utils/entries";
import { pick } from "../../../utils/pick";
import type { Xyz } from "../../../utils/vectors/vectors";
import { findStartingRoomsInCampaign } from "../../gameState/loadGameState";

beforeEach(() => {
  resetStore();
});

/**
 * the original campaign, with head moved from his starting room to the
 * position in the room
 */
const campaignWithHeadAt = (
  roomId: OriginalCampaignRoomId,
  /**
   * in blocks
   */
  position: Xyz,
) => {
  const headStartRoomId = findStartingRoomsInCampaign(campaign).head!;
  const [headStartJsonItemId] = iterateRoomJsonItemsWithIds(
    campaign.rooms[headStartRoomId].items,
    "player",
  ).find(([, item]) => item.config.which === "head")!;

  return produce(campaign, (draft) => {
    delete draft.rooms[headStartRoomId].items[headStartJsonItemId];
    draft.rooms[roomId].items.head = {
      type: "player",
      config: { which: "head" },
      position,
    };
  });
};

type Corner = { x: "max" | "min"; y: "max" | "min" };

type FallCase = {
  /**
   * a room of the original campaign over another room
   */
  roomAbove: OriginalCampaignRoomId;
  /**
   * the corner of the blocks head can fall from in the room
   */
  corner: Corner;
  /**
   * where head starts, in blocks
   */
  fallFrom: Xyz;
};

// on the floor, which has none, so he falls straight through. Corners blocked
// by solid items are left out: penitentiary14's max x, min y (a lift) and
// min x, max y, penitentiary21's min x, max y, and blacktooth3's max x, max y
// (blocks)
const fallCases: FallCase[] = [
  // over rooms of a different size:
  {
    roomAbove: "penitentiary14",
    corner: { x: "min", y: "min" },
    fallFrom: { x: 0, y: 1, z: 0 },
  },
  {
    roomAbove: "penitentiary14",
    corner: { x: "max", y: "max" },
    fallFrom: { x: 7, y: 4, z: 0 },
  },
  {
    roomAbove: "penitentiary15",
    corner: { x: "min", y: "min" },
    fallFrom: { x: 1, y: 1, z: 0 },
  },
  {
    roomAbove: "penitentiary15",
    corner: { x: "max", y: "min" },
    fallFrom: { x: 6, y: 1, z: 0 },
  },
  {
    roomAbove: "penitentiary15",
    corner: { x: "min", y: "max" },
    fallFrom: { x: 1, y: 6, z: 0 },
  },
  {
    roomAbove: "penitentiary15",
    corner: { x: "max", y: "max" },
    fallFrom: { x: 6, y: 6, z: 0 },
  },
  {
    roomAbove: "penitentiary21",
    corner: { x: "min", y: "min" },
    // on a block that vanishes when he lands, so he falls through after it:
    fallFrom: { x: 1, y: 1, z: 1 },
  },
  {
    roomAbove: "penitentiary21",
    corner: { x: "max", y: "min" },
    fallFrom: { x: 6, y: 1, z: 0 },
  },
  {
    roomAbove: "penitentiary21",
    corner: { x: "max", y: "max" },
    fallFrom: { x: 6, y: 6, z: 0 },
  },
  // over one sub-room of a room of two:
  {
    roomAbove: "bookworld29",
    corner: { x: "min", y: "min" },
    fallFrom: { x: 1, y: 1, z: 0 },
  },
  {
    roomAbove: "bookworld29",
    corner: { x: "max", y: "min" },
    fallFrom: { x: 6, y: 1, z: 0 },
  },
  {
    roomAbove: "bookworld29",
    corner: { x: "min", y: "max" },
    fallFrom: { x: 1, y: 6, z: 0 },
  },
  {
    roomAbove: "bookworld29",
    corner: { x: "max", y: "max" },
    fallFrom: { x: 6, y: 6, z: 0 },
  },
  // over a room of the same size, early in the game:
  {
    roomAbove: "blacktooth3",
    corner: { x: "min", y: "min" },
    fallFrom: { x: 0, y: 0, z: 0 },
  },
  {
    roomAbove: "blacktooth3",
    corner: { x: "max", y: "min" },
    fallFrom: { x: 7, y: 0, z: 0 },
  },
  {
    roomAbove: "blacktooth3",
    corner: { x: "min", y: "max" },
    fallFrom: { x: 0, y: 5, z: 0 },
  },
];

test.for<FallCase>(fallCases)(
  "falling from the $corner.x x, $corner.y y corner of $roomAbove into the room below",
  ({ roomAbove, fallFrom }) => {
    const gameState = setupGameForCampaign(
      campaignWithHeadAt(roomAbove, fallFrom),
    );
    const roomBelow = roomVerticalLink(
      campaign.rooms[roomAbove],
      "below",
    )!.room;

    playGameThrough(gameState, {
      until: currentRoomIs(roomBelow),
      failAfter: 10_000,
    });

    // the game falls correctly between these rooms, so serves as the reference:
    expect({
      fallFrom,
      arrivedAt: pick(headState(gameState).box, "x", "y", "z"),
    }).toMatchSnapshot();
  },
);

type RiseCase = {
  /**
   * a room of the original campaign under another room
   */
  roomBelow: OriginalCampaignRoomId;
  liftJsonItemId: string;
  liftPosition: Xyz;
};

const liftsUnderRoomsAbove: RiseCase[] = entries(campaign.rooms)
  .filter(([, roomJson]) => roomVerticalLink(roomJson, "above") !== undefined)
  .flatMap(([roomBelow, roomJson]) =>
    iterateRoomJsonItemsWithIds(roomJson.items, "lift")
      .map(([liftJsonItemId, { position: liftPosition }]) => ({
        roomBelow,
        liftJsonItemId,
        liftPosition,
      }))
      .toArray(),
  );

// by room/lift json item id:
const whyLiftNeverRisesIntoRoomAbove: Partial<Record<string, string>> = {
  "blacktooth78/l": "a moving platform starts on it, holding it down",
  "egyptus13/l": "its top is far below the ceiling",
  "penitentiary15/l": "it doesn't move",
};

test.for<RiseCase>(liftsUnderRoomsAbove)(
  "rising on lift $liftJsonItemId of $roomBelow into the room above",
  ({ roomBelow, liftJsonItemId, liftPosition }, { skip }) => {
    const whyNeverRises =
      whyLiftNeverRisesIntoRoomAbove[`${roomBelow}/${liftJsonItemId}`];
    if (whyNeverRises !== undefined) {
      skip(whyNeverRises);
    }

    const gameState = setupGameForCampaign(
      // a block up, to drop onto the lift:
      campaignWithHeadAt(roomBelow, { ...liftPosition, z: liftPosition.z + 1 }),
    );
    const roomAbove = roomVerticalLink(
      campaign.rooms[roomBelow],
      "above",
    )!.room;

    playGameThrough(gameState, {
      until: currentRoomIs(roomAbove),
      failAfter: 20_000,
    });

    // the game rises correctly between these rooms, so serves as the reference:
    expect({
      riseFrom: liftPosition,
      arrivedAt: pick(headState(gameState).box, "x", "y", "z"),
    }).toMatchSnapshot();
  },
);
