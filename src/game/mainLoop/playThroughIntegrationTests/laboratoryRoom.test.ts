import { expect, test } from "vitest";

import type { UnindexedRoomState } from "../../gameState/saving/SavedGameState";

import {
  basicEmptyRoom,
  setupGameForCampaign,
} from "../../../_testUtils/basicRoom";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { roomSpatialIndexKey } from "../../../model/RoomState";
import { omit } from "../../../utils/pick";
import { complexRoom } from "./laboratoryRoom";

test(
  'playing through a complex, deterministic room ("laboratory") should always give the same results after a fixed amount of time',
  { timeout: 60_000 },
  () => {
    const gameState = setupGameForCampaign({
      locator: {
        campaignName: "basicGameStateTestCampaign",
        userId: "anon",
        version: 0,
      },
      rooms: {
        laboratory: complexRoom,
        nowhere: basicEmptyRoom("nowhere"),
      },
    });

    playGameThrough(gameState, {
      until: 30_000, // half a minute
    });

    // fine to update this snapshot if there are intentional changes
    // to the mechanics etc, but should not change after pure refactoring
    const heelsRoomFinalState = gameState.characterRooms.heels!;

    expect<UnindexedRoomState<string, string>>(
      // the spatial index doesn't have to be identical before/after
      omit(heelsRoomFinalState, roomSpatialIndexKey),
    ).toMatchSnapshot();
  },
);
