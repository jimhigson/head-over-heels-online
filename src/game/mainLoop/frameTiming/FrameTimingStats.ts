import mitt from "mitt";

import { startAppListening } from "../../../store/listenerMiddleware";
import { selectShowFps } from "../../../store/slices/gameMenus/gameMenusSelectors";

export type PhaseStats = {
  avgMs: number;
  /** the single slowest frame's time in this phase over the report interval */
  maxMs: number;
  percentage: number;
};

/**
 * the sub-phases of updateSceneGraph, measured inside `RoomRenderer.tick` (in
 * this pipeline order): render-box reconcile, visual-index update, z-edge
 * (draw-order graph) update, topological sort, and the item renderers' ticks
 */
export const sceneGraphSubPhases = [
  "reconcileRenderBoxes",
  "updateBroadPhase",
  "updateZEdges",
  "toposort",
  "tickItems",
] as const;

export type SceneGraphSubPhase = (typeof sceneGraphSubPhases)[number];

export type FrameTimingStatsEvent = {
  frameCount: number;
  elapsedMs: number;
  fps: number;
  theoreticalFps: number;
  phases: {
    physics: PhaseStats;
    hudUpdateSceneGraph: PhaseStats;
    updateSceneGraph: PhaseStats;
    /**
     * breakdown of {@link FrameTimingStatsEvent.phases}.updateSceneGraph -
     * the room renderer's own phases. Sub-phase counts can be lower than the
     * parent's (frames can run the scene-graph phase without a room
     * renderer), and not everything in the parent is measured (scroll,
     * renderer construction etc), so the sub-phase averages sum to at most
     * the parent's
     */
    updateSceneGraphSubPhases: { [P in SceneGraphSubPhase]: PhaseStats };
    /**
     * the main loop's spritesheet-variant rebuilds - usually not measured at all
     * (no rebuild that interval, so count 0). Its time is already inside the
     * updateSceneGraph phase, so it does not add to the frame total
     */
    spritesheetRebuild: PhaseStats;
    pixiRender: PhaseStats;
    total: PhaseStats;
  };
};

/**
 * Tracks frame timing statistics for different phases of the game loop.
 * Accumulates timing data and reports averages periodically.
 *
 * This module is kept out of the main game bundle - load it via
 * `loadFrameTimingStats` in `lazyFrameTimingStats.ts` (the chunk is only
 * fetched when the fps display is turned on, or `detailedFps()` is called)
 */
export class FrameTimingStats {
  static readonly instance = new FrameTimingStats();

  #stats = {
    physics: { totalMs: 0, count: 0, maxMs: 0 },
    hudUpdate: { totalMs: 0, count: 0, maxMs: 0 },
    updateSceneGraph: { totalMs: 0, count: 0, maxMs: 0 },
    pixiRender: { totalMs: 0, count: 0, maxMs: 0 },
  };

  /**
   * accumulators for the room renderer's sub-phases of updateSceneGraph
   * (fixed structure, mutated in place - no per-frame allocation)
   */
  #subPhaseStats: {
    [P in SceneGraphSubPhase]: {
      totalMs: number;
      count: number;
      maxMs: number;
    };
  } = {
    reconcileRenderBoxes: { totalMs: 0, count: 0, maxMs: 0 },
    updateBroadPhase: { totalMs: 0, count: 0, maxMs: 0 },
    updateZEdges: { totalMs: 0, count: 0, maxMs: 0 },
    toposort: { totalMs: 0, count: 0, maxMs: 0 },
    tickItems: { totalMs: 0, count: 0, maxMs: 0 },
  };

  /** accumulates the measured phase times of the frame currently in progress */
  #frameTotalMs = 0;
  /** the worst single frame's summed phase time over the report interval */
  #maxTotalMs = 0;

  /**
   * timing accumulator for the main loop's spritesheet-variant rebuilds over the
   * interval - measured like a sub-phase (does not add to the frame total)
   */
  #spritesheetRebuildStats = { totalMs: 0, count: 0, maxMs: 0 };

  #currentTimings: Partial<{
    physicsStart: number;
    hudUpdateStart: number;
    updateSceneGraphStart: number;
    pixiRenderStart: number;
  }> = {};

  #lastReportTime = performance.now();

  #eventBuffer: FrameTimingStatsEvent = {
    frameCount: 0,
    elapsedMs: 0,
    fps: 0,
    theoreticalFps: 0,
    phases: {
      physics: { avgMs: 0, maxMs: 0, percentage: 0 },
      hudUpdateSceneGraph: { avgMs: 0, maxMs: 0, percentage: 0 },
      updateSceneGraph: { avgMs: 0, maxMs: 0, percentage: 0 },
      updateSceneGraphSubPhases: {
        reconcileRenderBoxes: { avgMs: 0, maxMs: 0, percentage: 0 },
        updateBroadPhase: { avgMs: 0, maxMs: 0, percentage: 0 },
        updateZEdges: { avgMs: 0, maxMs: 0, percentage: 0 },
        toposort: { avgMs: 0, maxMs: 0, percentage: 0 },
        tickItems: { avgMs: 0, maxMs: 0, percentage: 0 },
      },
      spritesheetRebuild: { avgMs: 0, maxMs: 0, percentage: 0 },
      pixiRender: { avgMs: 0, maxMs: 0, percentage: 0 },
      total: { avgMs: 0, maxMs: 0, percentage: 0 },
    },
  };

  #events = mitt<{ stats: FrameTimingStatsEvent }>();

  #reportIntervalMs: number;

  private constructor(reportIntervalMs: number = 2_000) {
    this.#reportIntervalMs = reportIntervalMs;
  }

  startPhysics() {
    this.#currentTimings.physicsStart = performance.now();
  }

  endPhysics() {
    if (this.#currentTimings.physicsStart === undefined) {
      console.warn("endPhysics called without startPhysics");
      return;
    }
    const elapsed = performance.now() - this.#currentTimings.physicsStart;
    this.#stats.physics.totalMs += elapsed;
    this.#stats.physics.count++;
    this.#stats.physics.maxMs = Math.max(this.#stats.physics.maxMs, elapsed);
    this.#frameTotalMs += elapsed;
    this.#currentTimings.physicsStart = undefined;
  }

  startHudUpdate() {
    this.#currentTimings.hudUpdateStart = performance.now();
  }

  endHudUpdate() {
    if (this.#currentTimings.hudUpdateStart === undefined) {
      console.warn("endHudUpdate called without startHudUpdate");
      return;
    }
    const elapsed = performance.now() - this.#currentTimings.hudUpdateStart;
    this.#stats.hudUpdate.totalMs += elapsed;
    this.#stats.hudUpdate.count++;
    this.#stats.hudUpdate.maxMs = Math.max(
      this.#stats.hudUpdate.maxMs,
      elapsed,
    );
    this.#frameTotalMs += elapsed;
    this.#currentTimings.hudUpdateStart = undefined;
  }

  startUpdateSceneGraph() {
    this.#currentTimings.updateSceneGraphStart = performance.now();
  }

  endUpdateSceneGraph() {
    if (this.#currentTimings.updateSceneGraphStart === undefined) {
      console.warn("endUpdateSceneGraph called without startUpdateSceneGraph");
      return;
    }
    const elapsed =
      performance.now() - this.#currentTimings.updateSceneGraphStart;
    this.#stats.updateSceneGraph.totalMs += elapsed;
    this.#stats.updateSceneGraph.count++;
    this.#stats.updateSceneGraph.maxMs = Math.max(
      this.#stats.updateSceneGraph.maxMs,
      elapsed,
    );
    this.#frameTotalMs += elapsed;
    this.#currentTimings.updateSceneGraphStart = undefined;
  }

  /**
   * accumulate one room-renderer sub-phase's time for the current frame. The
   * time is already inside the updateSceneGraph phase's measurement, so it
   * does not add to the frame total
   */
  recordSceneGraphSubPhase(subPhase: SceneGraphSubPhase, elapsedMs: number) {
    const stat = this.#subPhaseStats[subPhase];
    stat.totalMs += elapsedMs;
    stat.count++;
    stat.maxMs = Math.max(stat.maxMs, elapsedMs);
  }

  /** record one spritesheet-variant rebuild the main loop ran this frame */
  recordSpritesheetRebuild(elapsedMs: number) {
    const stat = this.#spritesheetRebuildStats;
    stat.totalMs += elapsedMs;
    stat.count++;
    stat.maxMs = Math.max(stat.maxMs, elapsedMs);
  }

  startPixiRender() {
    this.#currentTimings.pixiRenderStart = performance.now();
  }

  endPixiRender() {
    if (this.#currentTimings.pixiRenderStart === undefined) {
      console.warn("endPixiRender called without startPixiRender");
      return;
    }
    const elapsed = performance.now() - this.#currentTimings.pixiRenderStart;
    this.#stats.pixiRender.totalMs += elapsed;
    this.#stats.pixiRender.count++;
    this.#stats.pixiRender.maxMs = Math.max(
      this.#stats.pixiRender.maxMs,
      elapsed,
    );
    this.#frameTotalMs += elapsed;
    this.#currentTimings.pixiRenderStart = undefined;
  }

  /**
   * Called at the end of each frame.
   * Reports averages every report interval and resets counters.
   */
  tickDone() {
    // finalise this frame's summed phase time before it is reset for the next:
    this.#maxTotalMs = Math.max(this.#maxTotalMs, this.#frameTotalMs);
    this.#frameTotalMs = 0;

    const now = performance.now();
    if (now - this.#lastReportTime >= this.#reportIntervalMs) {
      this.#reportAndReset(now);
    }
  }

  /** how often the detailed stats are emitted, in ms (see detailedFps) */
  setReportInterval(ms: number) {
    this.#reportIntervalMs = ms;
    this.reset();
  }

  on(handler: (event: FrameTimingStatsEvent) => void) {
    this.#events.on("stats", handler);
  }

  off(handler: (event: FrameTimingStatsEvent) => void) {
    this.#events.off("stats", handler);
  }

  #reportAndReset(now: number) {
    const { physics, hudUpdate, updateSceneGraph, pixiRender } = this.#stats;

    // Only report if we have data
    if (
      physics.count === 0 &&
      hudUpdate.count === 0 &&
      updateSceneGraph.count === 0 &&
      pixiRender.count === 0
    ) {
      return;
    }

    this.#fillEventBuffer(now);
    this.#events.emit("stats", this.#eventBuffer);

    this.reset(now);
  }

  #fillEventBuffer(now: number) {
    const { physics, hudUpdate, updateSceneGraph, pixiRender } = this.#stats;

    const avgPhysics = physics.count > 0 ? physics.totalMs / physics.count : 0;
    const avgHudUpdate =
      hudUpdate.count > 0 ? hudUpdate.totalMs / hudUpdate.count : 0;
    const avgUpdateSceneGraph =
      updateSceneGraph.count > 0 ?
        updateSceneGraph.totalMs / updateSceneGraph.count
      : 0;
    const avgPixiRender =
      pixiRender.count > 0 ? pixiRender.totalMs / pixiRender.count : 0;

    const totalAvg =
      avgPhysics + avgHudUpdate + avgUpdateSceneGraph + avgPixiRender;

    const frameCount = Math.max(
      physics.count,
      hudUpdate.count,
      updateSceneGraph.count,
      pixiRender.count,
    );
    const elapsedMs = now - this.#lastReportTime;

    this.#eventBuffer.frameCount = frameCount;
    this.#eventBuffer.elapsedMs = elapsedMs;
    this.#eventBuffer.fps = (frameCount / elapsedMs) * 1_000;
    this.#eventBuffer.theoreticalFps = totalAvg > 0 ? 1_000 / totalAvg : 0;
    this.#eventBuffer.phases.physics.avgMs = avgPhysics;
    this.#eventBuffer.phases.physics.maxMs = physics.maxMs;
    this.#eventBuffer.phases.physics.percentage = (avgPhysics / totalAvg) * 100;
    this.#eventBuffer.phases.hudUpdateSceneGraph.avgMs = avgHudUpdate;
    this.#eventBuffer.phases.hudUpdateSceneGraph.maxMs = hudUpdate.maxMs;
    this.#eventBuffer.phases.hudUpdateSceneGraph.percentage =
      (avgHudUpdate / totalAvg) * 100;
    this.#eventBuffer.phases.updateSceneGraph.avgMs = avgUpdateSceneGraph;
    this.#eventBuffer.phases.updateSceneGraph.maxMs = updateSceneGraph.maxMs;
    this.#eventBuffer.phases.updateSceneGraph.percentage =
      (avgUpdateSceneGraph / totalAvg) * 100;
    for (const subPhase of sceneGraphSubPhases) {
      const stat = this.#subPhaseStats[subPhase];
      const buffer =
        this.#eventBuffer.phases.updateSceneGraphSubPhases[subPhase];
      buffer.avgMs = stat.count > 0 ? stat.totalMs / stat.count : 0;
      buffer.maxMs = stat.maxMs;
      buffer.percentage = (buffer.avgMs / totalAvg) * 100;
    }
    this.#eventBuffer.phases.pixiRender.avgMs = avgPixiRender;
    this.#eventBuffer.phases.pixiRender.maxMs = pixiRender.maxMs;
    this.#eventBuffer.phases.pixiRender.percentage =
      (avgPixiRender / totalAvg) * 100;
    const rebuild = this.#spritesheetRebuildStats;
    const avgRebuild = rebuild.count > 0 ? rebuild.totalMs / rebuild.count : 0;
    this.#eventBuffer.phases.spritesheetRebuild.avgMs = avgRebuild;
    this.#eventBuffer.phases.spritesheetRebuild.maxMs = rebuild.maxMs;
    this.#eventBuffer.phases.spritesheetRebuild.percentage =
      totalAvg > 0 ? (avgRebuild / totalAvg) * 100 : 0;
    this.#eventBuffer.phases.total.avgMs = totalAvg;
    this.#eventBuffer.phases.total.maxMs = this.#maxTotalMs;
    this.#eventBuffer.phases.total.percentage = 100;
  }

  reset(now: number = performance.now()) {
    this.#stats.physics.totalMs = 0;
    this.#stats.physics.count = 0;
    this.#stats.physics.maxMs = 0;
    this.#stats.hudUpdate.totalMs = 0;
    this.#stats.hudUpdate.count = 0;
    this.#stats.hudUpdate.maxMs = 0;
    this.#stats.updateSceneGraph.totalMs = 0;
    this.#stats.updateSceneGraph.count = 0;
    this.#stats.updateSceneGraph.maxMs = 0;
    this.#stats.pixiRender.totalMs = 0;
    this.#stats.pixiRender.count = 0;
    this.#stats.pixiRender.maxMs = 0;
    for (const subPhase of sceneGraphSubPhases) {
      const stat = this.#subPhaseStats[subPhase];
      stat.totalMs = 0;
      stat.count = 0;
      stat.maxMs = 0;
    }
    this.#spritesheetRebuildStats.totalMs = 0;
    this.#spritesheetRebuildStats.count = 0;
    this.#spritesheetRebuildStats.maxMs = 0;
    this.#maxTotalMs = 0;
    this.#frameTotalMs = 0;
    this.#lastReportTime = now;
  }
}

export const frameTimingStats = FrameTimingStats.instance;

/**
 * the narrow surface the room renderer uses to report its scene-graph
 * sub-phase timings. Threaded through the room tick context by the main
 * loop: the real stats object when the fps display is on, undefined
 * otherwise - so with the display off, no timing marks are taken at all
 */
export type SceneGraphPhaseRecorder = Pick<
  FrameTimingStats,
  "recordSceneGraphSubPhase"
>;

startAppListening({
  predicate(_action, currentState, previousState) {
    return selectShowFps(currentState) !== selectShowFps(previousState);
  },
  effect(_action) {
    // reset stats when toggling FPS
    frameTimingStats.reset();
  },
});
