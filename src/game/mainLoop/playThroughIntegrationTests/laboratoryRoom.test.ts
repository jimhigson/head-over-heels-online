import { expect, test } from "vitest";

import { setupGameForCampaign } from "../../../_testUtils/basicRoom";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { roomSpatialIndexKey } from "../../../model/RoomState";
import { omit } from "../../../utils/pick";
import { type UnindexedRoomState } from "../../gameState/saving/SavedGameState";
import { laboratoryCampaign } from "./laboratoryCampaign";

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

    expect<UnindexedRoomState<string, string>>(
      // the spatial index doesn't have to be identical before/after
      omit(heelsRoomFinalState, roomSpatialIndexKey),
    ).toMatchSnapshot();
  },
);
