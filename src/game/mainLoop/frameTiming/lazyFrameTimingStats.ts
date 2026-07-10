import { importOnce } from "../../../utils/importOnce";
import { type FrameTimingStats } from "./FrameTimingStats";

let loadedStats: FrameTimingStats | undefined;

/**
 * dynamically imports the frame-timing chunk (kept out of the main game
 * bundle) and resolves with its singleton stats object. Wrapped in importOnce
 * so the module is only ever imported once (safari misbehaves on repeated
 * dynamic imports of the same module)
 */
export const loadFrameTimingStats = importOnce(() =>
  import("./FrameTimingStats").then(({ frameTimingStats }) => {
    loadedStats = frameTimingStats;
    return frameTimingStats;
  }),
);

/**
 * the frame-timing singleton, synchronously - undefined until the chunk has
 * finished loading (never requested, or the import is still in flight)
 */
export const loadedFrameTimingStats = (): FrameTimingStats | undefined =>
  loadedStats;
