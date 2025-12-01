/* eslint-disable no-console */
import {
  frameTimingStats,
  type FrameTimingStatsEvent,
} from "./FrameTimingStats";

const logFrameTimingStats = (event: FrameTimingStatsEvent) => {
  const { frameCount, fps, theoreticalFps, phases, elapsedMs } = event;
  console.log(
    `Frame timing (${frameCount} frames in ${(elapsedMs / 1_000).toFixed(3)}s, ${fps.toFixed(1)} fps, theoretical max: ${theoreticalFps.toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} fps):`,
  );
  console.table({
    physics: {
      avgMs: phases.physics.avgMs.toFixed(2),
      percentage: phases.physics.percentage.toFixed(1) + "%",
    },
    hudUpdateSceneGraph: {
      avgMs: phases.hudUpdateSceneGraph.avgMs.toFixed(2),
      percentage: phases.hudUpdateSceneGraph.percentage.toFixed(1) + "%",
    },
    updateSceneGraph: {
      avgMs: phases.updateSceneGraph.avgMs.toFixed(2),
      percentage: phases.updateSceneGraph.percentage.toFixed(1) + "%",
    },
    "pixi.js app.render": {
      avgMs: phases.pixiRender.avgMs.toFixed(2),
      percentage: phases.pixiRender.percentage.toFixed(1) + "%",
    },
    total: {
      avgMs: phases.total.avgMs.toFixed(2),
      percentage: "100%",
    },
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
