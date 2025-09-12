/**
 * Tracks frame timing statistics for different phases of the game loop.
 * Accumulates timing data and reports averages periodically.
 */
class FrameTimingStats {
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
  #reportIntervalMs = 5_000;

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
    if (now - this.#lastReportTime >= this.#reportIntervalMs) {
      this.#reportAndReset(now);
    }
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
    const elapsedSeconds = (now - this.#lastReportTime) / 1000;
    const fps = frameCount / elapsedSeconds;
    const theoreticalFps = totalAvg > 0 ? 1000 / totalAvg : 0;

    console.log(
      `Frame timing (${frameCount} frames, ${fps.toFixed(1)} fps, theoretical max: ${theoreticalFps.toFixed(1)} fps):`,
    );
    console.table({
      physics: {
        avgMs: avgPhysics.toFixed(2),
        percentage: ((avgPhysics / totalAvg) * 100).toFixed(1) + "%",
      },
      hudUpdateSceneGraph: {
        avgMs: avgHudUpdate.toFixed(2),
        percentage: ((avgHudUpdate / totalAvg) * 100).toFixed(1) + "%",
      },
      updateSceneGraph: {
        avgMs: avgUpdateSceneGraph.toFixed(2),
        percentage: ((avgUpdateSceneGraph / totalAvg) * 100).toFixed(1) + "%",
      },
      "pixi.js app.render": {
        avgMs: avgPixiRender.toFixed(2),
        percentage: ((avgPixiRender / totalAvg) * 100).toFixed(1) + "%",
      },
      total: {
        avgMs: totalAvg.toFixed(2),
        percentage: "100%",
      },
    });

    // Reset stats
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

let frameTimingStats: FrameTimingStats | undefined;

/**
 * Get the current timing stats instance, or undefined if not started
 */
export const getTimingStats = () => frameTimingStats;

/**
 * Start timing stats collection. Call from dev console: window.startTiming()
 */
export const startTiming = () => {
  if (!frameTimingStats) {
    frameTimingStats = new FrameTimingStats();
    console.log(
      "Frame timing started. Stats will be reported every 5 seconds.",
    );
  } else {
    console.log("Frame timing already running.");
  }
};

declare global {
  interface Window {
    startTiming: typeof startTiming;
  }
}

// Expose to window for dev console access
if (typeof window !== "undefined") {
  window.startTiming = startTiming;

  // Log availability message
  console.log(
    "%cPerformance timing available:",
    "color: #4CAF50; font-weight: bold",
  );
  console.log("call: startTiming() to start collecting frame timing stats");
}
