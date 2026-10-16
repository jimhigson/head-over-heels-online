import { bench } from "vitest";

import { setupGameForCampaign } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { loadCampaignFromDb } from "../../../db/campaign";
import { postgrestDb } from "../../../db/postgrestDb";
import { jimAtBlockstackingUserId } from "../../../gameInfo";
import { findStartingRoomsInCampaign } from "../../gameState/loadGameState";
import { maxSubTickDeltaMs } from "../../physics/mechanicsConstants";
import { progressGameState } from "../progressGameState";
import { progressWithSubTicks } from "../progressWithSubTicks";

/*
Plays the complex, deterministic "laboratory" room for 60 simulated seconds at
60fps, with no input. Each iteration includes loading the room, since playing
mutates the game state. The campaign is the latest version of Jim's
"laboratory" campaign in the db, so the bench tracks the room as it is edited -
compare runs only at the same campaign version (logged when the bench starts).

All recorded on Apple M4 Pro (14 cores, 48GB), macOS 27.0.1, node v26.5.0

`pnpm bench --run laboratoryRoom`

Releases were run on 2026-10-16, with this bench added to the release. Before
v26 there was no columnar decoder, so v24 and v25 load "laboratory" v14 from
json decoded by branch `opt`.

2026-06-21 (release v24)
========================

v24 against "laboratory" v14 (decoded json)

  hz      min       max       mean      p75       p99       rme     samples
  0.3802  2,568.83  2,707.65  2,630.22  2,648.60  2,707.65  ±1.06%  10

2026-06-26 (release v25)
========================

v25 against "laboratory" v14 (decoded json)

  hz      min       max       mean      p75       p99       rme     samples
  0.3757  2,614.10  2,816.90  2,661.44  2,656.27  2,816.90  ±1.52%  10

(1.2% slower at mean vs v24)

2026-07-08 (release v26)
========================

v26 against "laboratory" v14

  hz      min       max       mean      p75       p99       rme     samples
  0.3341  2,904.19  3,087.11  2,993.09  3,038.35  3,087.11  ±1.38%  10

(12.5% slower at mean vs v25)

2026-08-29 (release v27)
========================

v27 against "laboratory" v14

  hz      min       max       mean      p75       p99       rme     samples
  0.3641  2,693.88  2,792.47  2,746.13  2,760.26  2,792.47  ±0.67%  10

(8.3% faster at mean vs v26)

2026-10-16 (pre-release v28)
============================

* ItemBehaviours
* room items iterated by callback (forEachRoomItem), not a generator
* vels iterated with for...in, not entries
* spatial index cells walked with plain loops, not a cell-key generator
* unchanged spatial index moves skipped
* collision queries use the index's findInBox/filterInBox with once-declared
  predicates - no per-query neighbourhood Set or closure
* per-tick starting-positions/spatial-items containers reused
* tick-order comparator scores object at module scope
* items stood on by nothing get a shared allocation-free empty iterator
* latent movement skipped for items with none queued
* input press vectors as an array (shared empty array when idle), not a
  generator
* moveItem's push path Set only created when a move pushes something
* vels scaled directly, not copied onto the origin first

  hz      min       max       mean      p75       p99       rme     samples
  0.5468  1,795.32  1,858.56  1,828.78  1,840.15  1,858.56  ±0.72%  10

(33.4% faster at mean vs v27)
*/

const fps = 60;
const simulatedSeconds = 60;

const laboratoryCampaign = await loadCampaignFromDb(postgrestDb, {
  userId: jimAtBlockstackingUserId,
  campaignName: "laboratory",
});
console.log(
  "laboratory campaign version",
  laboratoryCampaign.locator.version,
  "starting rooms",
  findStartingRoomsInCampaign(laboratoryCampaign),
);

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
