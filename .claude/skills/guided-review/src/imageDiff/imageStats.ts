/* The mechanical per-image summary: what % of pixels changed between the
   default pair. Computed here in the page, one image at a time after load,
   because a human can see an image diff at a glance - the note only has to
   quantify it, never describe it. */

import { images } from "../payload.ts";
import { makeStore } from "../stores.ts";
import { imageBlobUris } from "./imageBlobs.ts";
import { computeImageDiffStats, imageDimensions } from "./imageDiffCompute.ts";

export type ImageRowStats =
  | {
      /** the row has nothing to compare: one version, or a byte-identical pair */
      type: "single";
      width: number;
      height: number;
    }
  | {
      type: "pair";
      width: number;
      height: number;
      count: number;
      total: number;
    };

export const imageStatsStore = makeStore<Record<string, ImageRowStats>>({});

const formatPercent = (count: number, total: number): string => {
  const percent = (count / total) * 100;
  if (percent < 0.1) {
    return "<0.1%";
  }
  return `${percent >= 10 ? Math.round(percent) : percent.toFixed(1)}%`;
};

/** the one line a row says about its image */
export const mechanicalNote = (stats: ImageRowStats): string => {
  const size = `${stats.width}×${stats.height}px`;
  if (stats.type === "single") {
    return size;
  }
  if (stats.count === 0) {
    return `${size} — pixel-identical (only the encoding differs)`;
  }
  return `${size} — ${formatPercent(stats.count, stats.total)} of pixels differ (${stats.count.toLocaleString("en-GB")}px)`;
};

const statsForRow = async (path: string): Promise<ImageRowStats | undefined> => {
  const row = images[path];
  if (row === undefined || row.versions.length === 0) {
    return undefined;
  }
  const fromVersion = row.versions[row.from];
  const toVersion = row.versions[row.to];
  if (fromVersion === undefined || toVersion === undefined) {
    return undefined;
  }
  // not retained: this sweep touches every image once, and holding all their
  // data uris at once is exactly what phone webviews can't afford
  const uris = imageBlobUris(path, false);
  const fromUri = uris[fromVersion.blob];
  const toUri = uris[toVersion.blob];
  if (fromUri === undefined || toUri === undefined) {
    return undefined;
  }
  if (fromVersion.blob === toVersion.blob) {
    return { type: "single", ...(await imageDimensions(toUri)) };
  }
  const { count, total, width, height } = await computeImageDiffStats(fromUri, toUri);
  return { type: "pair", count, total, width, height };
};

/** a review switch retargets `images`; the superseded sweep must stop rather
    than write another review's numbers into the store */
let sweepGeneration = 0;

/** fills the store row by row, in reading order, yielding between rows */
export const startImageStatsSweep = (): void => {
  const generation = (sweepGeneration += 1);
  const sweep = async (): Promise<void> => {
    for (const path of Object.keys(images)) {
      if (generation !== sweepGeneration) {
        return;
      }
      try {
        const stats = await statsForRow(path);
        if (stats !== undefined && generation === sweepGeneration) {
          imageStatsStore.set({ ...imageStatsStore.get(), [path]: stats });
        }
      } catch {
        // an undecodable image only loses its own summary line
      }
      // let interaction in between rows; the sweep is background work
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  };
  sweep();
};
