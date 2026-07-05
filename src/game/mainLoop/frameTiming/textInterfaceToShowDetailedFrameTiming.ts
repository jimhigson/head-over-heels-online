/* eslint-disable no-console */
import {
  frameTimingStats,
  type FrameTimingStatsEvent,
  type PhaseStats,
} from "./FrameTimingStats";

const formatPhaseStats = (phase: PhaseStats) => ({
  avgMs: phase.avgMs.toFixed(2),
  percentage: phase.percentage.toFixed(1) + "%",
  fps: (1_000 / phase.avgMs).toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  }),
});

const logFrameTimingStats = (event: FrameTimingStatsEvent) => {
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
    detailedFps: () => void;
  }
}
export const textInterfaceToShowDetailedFrameTiming = () => {
  if (typeof window !== "undefined") {
    window.detailedFps = () => {
      frameTimingStats.on(logFrameTimingStats);
    };

    console.log(
      "%cPerformance timing available:",
      "color: #4CAF50; font-weight: bold",
    );
    console.log(
      "call detailedFps() to log detailed frame timing stats to the console (and turn on FPS with F9 or in menus)",
    );
  }
};
