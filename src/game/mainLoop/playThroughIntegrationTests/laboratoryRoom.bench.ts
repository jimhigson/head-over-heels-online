import {
  BrowserAdapter,
  DOMAdapter,
  type ICanvas,
  type Renderer,
} from "pixi.js";
import { test } from "vitest";

import { setupGameForCampaign } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import type { GameStateWithMockInput } from "../../../_testUtils/MockInputStateTracker";
import { loadCampaignFromDb } from "../../../db/campaign";
import { postgrestDbClient } from "../../../db/postgrestDbClient";
import { jimAtBlockstackingUserId } from "../../../gameInfo";
import { spritesheetMetas } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { noPlanetsLiberated } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { selectUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { emptyUserSettings } from "../../../store/slices/userSettings/emptyUserSettings";
import { store } from "../../../store/store";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { findStartingRoomsInCampaign } from "../../gameState/loadGameState";
import { maxSubTickDeltaMs } from "../../physics/mechanicsConstants";
import type { RoomRenderer } from "../../render/room/RoomRenderer";
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

2026-11-23 (branch two-items-on-lift-sound-bug)
===============================================

against "laboratory" v16

* collisions sorted by priority, then overlap, then id, without allocating
* collision records gather across all of a frame's sub-ticks
* flush landings pick what to stand on by priority, then overlap
* every solid item is standable (no isStandable)
* optimise: find what is stood on is one loop - no iterator helpers, arrays or reduce
* bench @ 120fps (same tick count)

   name                                                hz       min       max      mean       p75       p99      p995      p999     rme  samples
   laboratory v16 for 60s @ 120 fps (7200 frames)  0.5309  1,863.09  1,901.09  1,883.85  1,896.00  1,900.89  1,900.99  1,901.07  ±0.51%       10

(2.4% slower at mean vs previous, but against a later campaign version)

2026-11-24 (branch two-items-on-lift-sound-bug)
===============================================

against "laboratory" v16, @ 120fps. Before the changes below:

  hz      min       max       mean      p75       p99       rme     samples
  0.5224  1,874.04  1,949.72  1,914.44  1,926.19  1,948.32  ±0.77%  10

* each sub-tick sorts the room's items in a reused array, not a new one
* items stood on are looped with for...in, not a generator and iterator helper
* helpful movement vector sensors collect into a reused array, without reduce
* latent movement is applied by callback with a reused buffer, not a generator
* homing monsters look up the playables directly, not with a generator
* shadow and mirror renderers collect into reused arrays
* charles' joystick check and the on-screen controls loop without iterators

  hz      min       max       mean      p75       p99       rme     samples
  0.5627  1,750.83  1,815.80  1,777.22  1,790.30  1,813.95  ±0.85%  10

(7.2% faster at mean than before these changes)

2026-11-24 (branch two-items-on-lift-sound-bug)
===============================================

against "laboratory" v16, @ 120fps

* experiment: playable and sliding checks as item behaviour methods
  (isPlayable, isSliding), not type guards on the item's type and state

  hz      min       max       mean      p75       p99       rme     samples
  0.5463  1,769.98  1,883.42  1,831.04  1,849.09  1,881.06  ±1.22%  10
  0.5425  1,815.57  1,884.66  1,843.58  1,850.30  1,883.14  ±0.80%  10

(3.0% and 3.7% slower at mean than the type guards)

* as above, but isPlayable/isSliding return false on the base behaviour and are
  overridden to return true, not read from a constructor option

  hz      min       max       mean      p75       p99       rme     samples
  0.5599  1,755.59  1,814.55  1,786.14  1,792.29  1,813.33  ±0.63%  10

(0.5% slower at mean than the type guards - within the noise)

2026-11-27 (branch two-items-on-lift-sound-bug)
===============================================

against "laboratory" v16, @ 120fps

* in-play configs have their times completed at load (walls too), so nothing
  completes them per frame
* new second bench: the same play-through, also rendered up to pixi

  hz      min       max       mean      p75       p99       rme     samples
  0.5925  1,654.99  1,723.49  1,687.87  1,700.61  1,722.42  ±0.90%  10

rendered up to pixi:

  hz      min       max       mean      p75       p99       rme     samples
  0.1825  5,337.59  5,594.81  5,481.67  5,519.96  5,590.14  ±0.90%  10

(rendering adds 3,794ms at mean - 0.53ms per frame)
*/

const fps = 120;
const simulatedSeconds = 60;

const laboratoryCampaign = await loadCampaignFromDb(postgrestDbClient, {
  userId: jimAtBlockstackingUserId,
  campaignName: "laboratory",
});
console.log(
  "laboratory campaign version",
  laboratoryCampaign.locator.version,
  "starting rooms",
  findStartingRoomsInCampaign(laboratoryCampaign),
);

test("load and play laboratory room", async ({ bench }) => {
  await bench(
    `laboratory v${laboratoryCampaign.locator.version} for ${simulatedSeconds}s @ ${fps} fps (${simulatedSeconds * fps} frames)`,
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
  ).run({ iterations: 10, time: 0, warmupIterations: 2, warmupTime: 0 });
});

/*
The same play-through, with the room's renderers also ticked after every
frame's physics, as the main loop does. This measures everything up to pixi
rendering the scene graph - z-sorting, shadows, reflections, appearances, and
creating and updating pixi's display objects - but not pixi rendering it (its
transform and batching pass, and the gpu), which never happens here.

The test sets up node with what the room renderers need of a browser before
benching, so none of it is in place for the bench before it, or timed.
*/
test(
  "load, play and render laboratory room",
  // more than the default, for 12 iterations of several seconds each:
  { timeout: 300_000 },
  async ({ bench }) => {
    /**
     * stands in for pixi's renderer, which this bench never draws with:
     * rendering a scene graph, including baking a container to a texture,
     * does nothing
     */
    const headlessPixiRenderer = { render() {} } as unknown as Renderer;

    type LaboratoryRoomRenderer = RoomRenderer<string, string>;

    /**
     * a canvas for floating text, whose 2d context measures text by its length
     * in (8px) characters and draws nothing
     */
    const textCanvas = () => {
      const context: Partial<CanvasRenderingContext2D> = {
        measureText: (text) => ({ width: text.length * 8 }) as TextMetrics,
        scale() {},
        fillText() {},
      };
      return { width: 0, height: 0, getContext: () => context };
    };

    /**
     * the app ticker's next frame, which node never calls - the bench calls it
     * once per frame instead, as the browser would, so animated sprites advance
     */
    let maybeAnimationFrame: FrameRequestCallback | undefined;

    // no canvas, so pixi's shader programs - made as the render modules load,
    // so before they are imported - fall back to their default precision:
    const noCanvas: Partial<ICanvas> = { getContext: () => null };
    DOMAdapter.set({
      ...BrowserAdapter,
      createCanvas: () => noCanvas as ICanvas,
    });
    // a document for floating text to rasterise with:
    const textDocument: Partial<Document> = {
      fonts: { check: () => true } as Partial<FontFaceSet> as FontFaceSet,
      createElement: textCanvas as unknown as Document["createElement"],
    };
    globalThis.document = textDocument as Document;
    globalThis.requestAnimationFrame = (animationFrame) => {
      maybeAnimationFrame = animationFrame;
      return 1;
    };
    globalThis.cancelAnimationFrame = () => {
      maybeAnimationFrame = undefined;
    };

    const { Spritesheets } =
      await import("../../../sprites/spritesheet/Spritesheets");
    const { noRoomRendererDecorators, RoomRenderer } =
      await import("../../render/room/RoomRenderer");

    const spritesheets = new Spritesheets();
    // no image to load, so the sheets are built over Texture.EMPTY:
    await spritesheets.loadImage(headlessPixiRenderer, "blockstack");

    /**
     * the room renderer for the current room, made again (as the main loop
     * does) if the current room has changed
     */
    const rendererForCurrentRoom = (
      gameState: GameStateWithMockInput,
      previousRoomRenderer: LaboratoryRoomRenderer | undefined,
    ): LaboratoryRoomRenderer => {
      const maybeRoom = selectCurrentRoomState<string, string>(gameState);
      if (import.meta.env.DEV && maybeRoom === undefined) {
        throw new Error("laboratory game has no current room");
      }
      const room = maybeRoom!;
      if (previousRoomRenderer?.renderContext.room === room) {
        return previousRoomRenderer;
      }
      previousRoomRenderer?.destroy();
      spritesheets.rebuild(
        headlessPixiRenderer,
        room.planet,
        room.color,
        spritesheetMetas.blockstack,
        1,
      );
      return new RoomRenderer<string, string>(
        {
          room,
          general: {
            displaySettings: emptyUserSettings.displaySettings,
            // muted, so there are no sound renderers:
            soundSettings: { mute: true },
            pixiRenderer: headlessPixiRenderer,
            gameState,
            paused: false,
            spritesheetMeta: spritesheetMetas.blockstack,
            upscale: selectUpscale(store.getState()),
            cameraAngle: gameState.targetCameraAngle,
            onScreenControls: false,
            speedCoefficient: 1,
            spritesheets,
            planetsLiberated: noPlanetsLiberated,
          },
        },
        noRoomRendererDecorators,
      );
    };

    /**
     * the time given to animation frames, advanced by a frame's simulated time
     * on each. Starts now, since the app ticker times its first frame from now
     */
    let animationFrameTime = performance.now();

    await bench(
      `laboratory v${laboratoryCampaign.locator.version} for ${simulatedSeconds}s @ ${fps} fps (${simulatedSeconds * fps} frames), rendered up to pixi`,
      () => {
        // the store would otherwise still have the previous iteration's game running:
        resetStore();
        const gameState = setupGameForCampaign(laboratoryCampaign);
        const ticker = progressWithSubTicks(
          progressGameState,
          maxSubTickDeltaMs,
        );
        let roomRenderer: LaboratoryRoomRenderer | undefined;
        for (let frame = 0; frame < simulatedSeconds * fps; frame++) {
          ticker(gameState, 1_000 / fps);
          gameState.inputStateTracker.mockTick();
          roomRenderer = rendererForCurrentRoom(gameState, roomRenderer);
          roomRenderer.tick({ deltaMS: 1_000 / fps, timingRecord: undefined });
          animationFrameTime += 1_000 / fps;
          maybeAnimationFrame?.(animationFrameTime);
        }
        roomRenderer?.destroy();
      },
    ).run({ iterations: 10, time: 0, warmupIterations: 2, warmupTime: 0 });
  },
);
