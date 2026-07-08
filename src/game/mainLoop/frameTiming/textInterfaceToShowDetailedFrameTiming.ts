/* eslint-disable no-console */
import {
  frameTimingStats,
  type FrameTimingStatsEvent,
  type PhaseStats,
} from "./FrameTimingStats";

const formatPhaseStats = (phase: PhaseStats) => ({
  avgMs: phase.avgMs.toFixed(2),
  maxMs: phase.maxMs.toFixed(2),
  percentage: phase.percentage.toFixed(1) + "%",
  fps: (1_000 / phase.avgMs).toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  }),
  minFps: (1_000 / phase.maxMs).toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  }),
});

const logFrameTimingStats = (event: FrameTimingStatsEvent) => {
  // expose the raw event so automated profiling can read exact numbers (the
  // console.table is unreadable through the devtools protocol):
  window.frameStats = event;

  const { frameCount, fps, theoreticalFps, phases, elapsedMs } = event;
  console.log(
    `Frame timing (${frameCount} frames in ${(elapsedMs / 1_000).toFixed(3)}s, ${fps.toFixed(1)} fps, theoretical max: ${theoreticalFps.toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} fps):`,
  );
  console.table({
    physics: formatPhaseStats(phases.physics),
    hudUpdateSceneGraph: formatPhaseStats(phases.hudUpdateSceneGraph),
    updateSceneGraph: formatPhaseStats(phases.updateSceneGraph),
    "pixi.js app.render": formatPhaseStats(phases.pixiRender),
    total: { ...formatPhaseStats(phases.total), percentage: "100%" },
  });
};

declare global {
  interface Window {
    detailedFps: (reportIntervalMs?: number) => void;
    /** the most recently emitted detailed frame-timing event (see detailedFps) */
    frameStats?: FrameTimingStatsEvent;
  }
}
export const textInterfaceToShowDetailedFrameTiming = () => {
  if (typeof window !== "undefined") {
    window.detailedFps = (reportIntervalMs?: number) => {
      if (reportIntervalMs !== undefined) {
        frameTimingStats.setReportInterval(reportIntervalMs);
      }
      // idempotent - calling detailedFps() again must not stack duplicate logs:
      frameTimingStats.off(logFrameTimingStats);
      frameTimingStats.on(logFrameTimingStats);
    };

    console.log(
      "%cPerformance timing available:",
      "color: #4CAF50; font-weight: bold",
    );
    console.log(
      "call detailedFps() to log detailed frame timing stats to the console (and turn on FPS with F9 or in menus). Pass an interval in ms, eg detailedFps(50), to report more often.",
    );
  }
};
