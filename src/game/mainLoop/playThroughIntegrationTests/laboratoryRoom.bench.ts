import { bench } from "vitest";

import { setupGameForCampaign } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { maxSubTickDeltaMs } from "../../physics/mechanicsConstants";
import { progressGameState } from "../progressGameState";
import { progressWithSubTicks } from "../progressWithSubTicks";
import { laboratoryCampaign } from "./laboratoryCampaign";

/*
Plays the complex, deterministic "laboratory" room for 60 simulated seconds at
60fps, with no input. Each iteration includes loading the room, since playing
mutates the game state. The identical-result of before vs after is guarded by
the sibling laboratoryRoom.test.ts snapshot.

Run 6th October 2026:
`pnpm bench --run laboratoryRoom` on an Apple M4 Pro (14 cores, 48GB),
macOS 27.0.1, node v26.5.0, times in ms:

  hz      min       max       mean      p75       p99       rme     samples
  0.3485  2,805.37  2,983.38  2,869.15  2,890.35  2,983.38  ±1.28%  10
*/

const fps = 60;
const simulatedSeconds = 60;

bench(
  "load and play the laboratory room for 60 simulated seconds",
  () => {
    // the store would otherwise still have the previous iteration's game running:
    resetStore();
    const gameState = setupGameForCampaign(laboratoryCampaign);
    const ticker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);
    for (let frame = 0; frame < simulatedSeconds * fps; frame++) {
      ticker(gameState, 1_000 / fps);
      gameState.inputStateTracker.mockTick();
    }
  },
  { iterations: 10, time: 0, warmupIterations: 2, warmupTime: 0 },
);
