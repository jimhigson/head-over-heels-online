import { expect, test } from "vitest";

import {
  basicEmptyRoom,
  setupGameForCampaign,
} from "../../../_testUtils/basicRoom";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { complexRoom } from "./laboratoryRoom";

test('playing through a complex, deterministic room ("laboratory") should always give the same results after a fixed amount of time', () => {
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

  playGameThrough(gameState, {});

  // fine to update this snapshot if there are intentional changes
  // to the mechanics etc, but should not change after pure refactoring
  expect(gameState.characterRooms.heels).toMatchSnapshot();
});
