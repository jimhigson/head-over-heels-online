import mitt from "mitt";

import { startAppListening } from "../../../store/listenerMiddleware";
import { selectShowFps } from "../../../store/slices/gameMenus/gameMenusSelectors";

export type PhaseStats = {
  avgMs: number;
  percentage: number;
};

export type FrameTimingStatsEvent = {
  frameCount: number;
  elapsedMs: number;
  fps: number;
  theoreticalFps: number;
  phases: {
    physics: PhaseStats;
    hudUpdateSceneGraph: PhaseStats;
    updateSceneGraph: PhaseStats;
    pixiRender: PhaseStats;
    total: PhaseStats;
  };
};

/**
 * Tracks frame timing statistics for different phases of the game loop.
 * Accumulates timing data and reports averages periodically.
 */
class FrameTimingStats {
  static readonly instance = new FrameTimingStats();

  #stats = {
    physics: { totalMs: 0, count: 0 },
    hudUpdate: { totalMs: 0, count: 0 },
    updateSceneGraph: { totalMs: 0, count: 0 },
    pixiRender: { totalMs: 0, count: 0 },
  };

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
      physics: { avgMs: 0, percentage: 0 },
      hudUpdateSceneGraph: { avgMs: 0, percentage: 0 },
      updateSceneGraph: { avgMs: 0, percentage: 0 },
      pixiRender: { avgMs: 0, percentage: 0 },
      total: { avgMs: 0, percentage: 0 },
    },
  };

  #events = mitt<{ stats: FrameTimingStatsEvent }>();

  private constructor(private reportIntervalMs: number = 2_000) {}

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
    this.#currentTimings.updateSceneGraphStart = undefined;
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
    this.#currentTimings.pixiRenderStart = undefined;
  }

  /**
   * Called at the end of each frame.
   * Reports averages every report interval and resets counters.
   */
  tickDone() {
    const now = performance.now();
    if (now - this.#lastReportTime >= this.reportIntervalMs) {
      this.#reportAndReset(now);
    }
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
    this.#eventBuffer.theoreticalFps = totalAvg > 0 ? 1000 / totalAvg : 0;
    this.#eventBuffer.phases.physics.avgMs = avgPhysics;
    this.#eventBuffer.phases.physics.percentage = (avgPhysics / totalAvg) * 100;
    this.#eventBuffer.phases.hudUpdateSceneGraph.avgMs = avgHudUpdate;
    this.#eventBuffer.phases.hudUpdateSceneGraph.percentage =
      (avgHudUpdate / totalAvg) * 100;
    this.#eventBuffer.phases.updateSceneGraph.avgMs = avgUpdateSceneGraph;
    this.#eventBuffer.phases.updateSceneGraph.percentage =
      (avgUpdateSceneGraph / totalAvg) * 100;
    this.#eventBuffer.phases.pixiRender.avgMs = avgPixiRender;
    this.#eventBuffer.phases.pixiRender.percentage =
      (avgPixiRender / totalAvg) * 100;
    this.#eventBuffer.phases.total.avgMs = totalAvg;
    this.#eventBuffer.phases.total.percentage = 100;
  }

  reset(now: number = performance.now()) {
    this.#stats.physics.totalMs = 0;
    this.#stats.physics.count = 0;
    this.#stats.hudUpdate.totalMs = 0;
    this.#stats.hudUpdate.count = 0;
    this.#stats.updateSceneGraph.totalMs = 0;
    this.#stats.updateSceneGraph.count = 0;
    this.#stats.pixiRender.totalMs = 0;
    this.#stats.pixiRender.count = 0;
    this.#lastReportTime = now;
  }
}

export const frameTimingStats = FrameTimingStats.instance;

startAppListening({
  predicate(_action, currentState, previousState) {
    return selectShowFps(currentState) !== selectShowFps(previousState);
  },
  effect(_action) {
    // reset stats when toggling FPS
    frameTimingStats.reset();
  },
});
