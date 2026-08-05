import {
  type ReportMeta,
  reportMetaElementId,
  type RowBlobs,
  rowDataElementId,
  type VersionKey,
} from "../reportData";
import { requireElement } from "./requireElement";

const parseJsonBlock = <Parsed>(elementId: string): Parsed =>
  JSON.parse(requireElement<HTMLScriptElement>(`#${elementId}`).text);

export const reportMeta = parseJsonBlock<ReportMeta>(reportMetaElementId);

export const rowsMeta = reportMeta.rows;

const rowBlobsCache = new Map<number, RowBlobs>();

/**
 * The images of one row, parsed from that row's inert JSON block the first
 * time it is asked for. Keeping them out of the executable script is what lets
 * memory-constrained mobile webviews run the viewer at all: no single script
 * evaluation ever holds more than the rows actually looked at.
 */
export const getRowBlobs = (rowIndex: number): RowBlobs => {
  const cached = rowBlobsCache.get(rowIndex);
  if (cached !== undefined) {
    return cached;
  }
  const parsed = parseJsonBlock<RowBlobs>(rowDataElementId(rowIndex));
  rowBlobsCache.set(rowIndex, parsed);
  return parsed;
};

export const getVersionDataUri = (
  rowIndex: number,
  version: VersionKey,
): string => {
  const rowBlobs = getRowBlobs(rowIndex);
  const blobIndex = rowBlobs.versions[version];
  if (blobIndex === undefined) {
    throw new Error(`row ${rowIndex} has no "${version}" version`);
  }
  return rowBlobs.blobUris[blobIndex];
};
