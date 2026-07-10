/* eslint-disable no-console */
import { entries } from "../../../utils/entries";
import {
  frameTimingStats,
  type FrameTimingStatsEvent,
  type PhaseStats,
} from "./FrameTimingStats";

/** top-level phases: fastest 🟩 through slowest 🟥 */
const squareScale = ["🟩", "🟨", "🟧", "🟥"] as const;
/** sub-phases: fastest 🟢 through slowest 🔴 */
const circleScale = ["🟢", "🟡", "🟠", "🔴"] as const;

type PhaseBadges = { avgMs: string; maxMs: string };

/**
 * ranks each value against its peers and returns a badge from the given scale
 * per value, in the original order - fastest at scale[0] through slowest at the
 * scale's last entry
 */
const rankBadges = (
  values: readonly number[],
  scale: readonly string[],
): string[] => {
  const n = values.length;
  const sortedByValue = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value);
  const badges = new Array<string>(n);
  for (const [rank, { index }] of sortedByValue.entries()) {
    const scaleIndex =
      n === 1 ? 0 : Math.round((rank / (n - 1)) * (scale.length - 1));
    badges[index] = scale[scaleIndex];
  }
  return badges;
};

/** format a millisecond value (with an optional badge), or "-" when exactly 0 */
const msCell = (ms: number, badge?: string) =>
  (ms === 0 ? "-" : ms.toFixed(2)) + (badge ? `  ${badge}` : "");

/** the hz (1000 / ms) a phase's ms implies, or "-" when the ms is 0 */
const hzCell = (ms: number) =>
  ms === 0 ? "-" : (
    (1_000 / ms).toLocaleString("en-GB", { maximumFractionDigits: 0 })
  );

/** format a percentage value, or "-" when exactly 0 */
const percentageCell = (percentage: number) =>
  percentage === 0 ? "-" : percentage.toFixed(1) + "%";

/** a byte count as a megabytes string, eg "123.4" */
const megabytes = (bytes: number) =>
  (bytes / 1_048_576).toLocaleString("en-GB", { maximumFractionDigits: 1 });

const formatPhaseStats = (
  phase: PhaseStats,
  /** rank badges for the top-level phases; omitted for sub-phases and total */
  badges?: PhaseBadges,
) => ({
  "average (ms)": msCell(phase.avgMs, badges?.avgMs),
  "slowest (ms)": msCell(phase.maxMs, badges?.maxMs),
  percentage: percentageCell(phase.percentage),
  hz: hzCell(phase.avgMs),
  "hz (min)": hzCell(phase.maxMs),
});

/** used JS heap at the previous report, to show an up/down arrow on the next */
let previousUsedJsHeapSize: number | undefined;

const logFrameTimingStats = (event: FrameTimingStatsEvent) => {
  // expose the raw event so automated profiling can read exact numbers (the
  // console.table is unreadable through the devtools protocol):
  window.frameStats = event;

  const { frameCount, fps, theoreticalFps, phases, elapsedMs } = event;
  console.log(
    `Frame timing (${frameCount} frames in ${(elapsedMs / 1_000).toFixed(3)}s, ${fps.toFixed(1)} fps, theoretical max: ${theoreticalFps.toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} fps):`,
  );
  // rank the top-level phases against each other (squares), so the slowest
  // avgMs/maxMs get 🟥 and the fastest 🟩:
  const [physicsAvg, hudAvg, updateAvg, pixiAvg] = rankBadges(
    [
      phases.physics.avgMs,
      phases.hudUpdateSceneGraph.avgMs,
      phases.updateSceneGraph.avgMs,
      phases.pixiRender.avgMs,
    ],
    squareScale,
  );
  const [physicsMax, hudMax, updateMax, pixiMax] = rankBadges(
    [
      phases.physics.maxMs,
      phases.hudUpdateSceneGraph.maxMs,
      phases.updateSceneGraph.maxMs,
      phases.pixiRender.maxMs,
    ],
    squareScale,
  );

  // rank the sub-phases only against each other (circles), within their branch;
  // a ↳ before each circle marks them as nested under the top-level squares:
  const subPhaseEntries = entries(phases.updateSceneGraphSubPhases);
  const subPhaseAvgBadges = rankBadges(
    subPhaseEntries.map(([, stats]) => stats.avgMs),
    circleScale,
  ).map((badge) => `↳ ${badge}`);
  const subPhaseMaxBadges = rankBadges(
    subPhaseEntries.map(([, stats]) => stats.maxMs),
    circleScale,
  ).map((badge) => `↳ ${badge}`);

  console.table({
    physics: formatPhaseStats(phases.physics, {
      avgMs: physicsAvg,
      maxMs: physicsMax,
    }),
    hudUpdateSceneGraph: formatPhaseStats(phases.hudUpdateSceneGraph, {
      avgMs: hudAvg,
      maxMs: hudMax,
    }),
    updateSceneGraph: formatPhaseStats(phases.updateSceneGraph, {
      avgMs: updateAvg,
      maxMs: updateMax,
    }),
    // the room renderer's sub-phases, indented under their parent phase:
    ...Object.fromEntries(
      subPhaseEntries.map(([subPhase, stats], i) => [
        `  ↳ ${subPhase}`,
        formatPhaseStats(stats, {
          avgMs: subPhaseAvgBadges[i],
          maxMs: subPhaseMaxBadges[i],
        }),
      ]),
    ),
    // the main loop's spritesheet rebuilds - rare, so show only the slowest one
    // and the hz it implies (1000 / slowest); "-" on intervals with no rebuild:
    "spritesheet rebuild": {
      "slowest (ms)": msCell(phases.spritesheetRebuild.maxMs),
      hz: hzCell(phases.spritesheetRebuild.maxMs),
    },
    "pixi.js app.render": formatPhaseStats(phases.pixiRender, {
      avgMs: pixiAvg,
      maxMs: pixiMax,
    }),
    // a blank spacer row separating the phases from the total; one existing
    // (empty) column is the minimum needed to stop chrome adding a stray
    // "Values" column for an otherwise-empty row:
    "": { "average (ms)": "" },
    TOTAL: { ...formatPhaseStats(phases.total), percentage: "100%" },
  });

  // performance.memory is chrome-only and non-standard - only print it where the
  // browser exposes it:
  const { memory } = performance;
  if (memory !== undefined) {
    const used = memory.usedJSHeapSize;
    // no green triangle emoji exists, so colour a geometric ▲/▼ with %c css:
    const trend =
      previousUsedJsHeapSize === undefined || used === previousUsedJsHeapSize ?
        { mark: "", colour: "" }
      : used > previousUsedJsHeapSize ? { mark: " ▲", colour: "red" }
      : { mark: " ▼", colour: "green" };
    previousUsedJsHeapSize = used;
    console.log(
      `JS heap: ${megabytes(used)}%c${trend.mark}%c / ${megabytes(memory.totalJSHeapSize)} MB (limit ${megabytes(memory.jsHeapSizeLimit)} MB)`,
      `color: ${trend.colour}`,
      "",
    );
  }
};

declare global {
  interface Window {
    /** the most recently emitted detailed frame-timing event (see detailedFps) */
    frameStats?: FrameTimingStatsEvent;
  }
  /**
   * chrome-only, non-standard: JS heap sizes in bytes. Undefined in browsers
   * that don't expose it (firefox, safari)
   */
  interface Performance {
    memory?: {
      readonly usedJSHeapSize: number;
      readonly totalJSHeapSize: number;
      readonly jsHeapSizeLimit: number;
    };
  }
}

/**
 * start logging the detailed frame-timing table to the console - the
 * implementation behind `window.detailedFps()`, whose stub in the main
 * bundle lazily imports this module (see registerDetailedFpsGlobal.ts)
 */
export const enableDetailedFrameTimingLog = (reportIntervalMs?: number) => {
  if (reportIntervalMs !== undefined) {
    frameTimingStats.setReportInterval(reportIntervalMs);
  }
  // idempotent - calling detailedFps() again must not stack duplicate logs:
  frameTimingStats.off(logFrameTimingStats);
  frameTimingStats.on(logFrameTimingStats);
};
