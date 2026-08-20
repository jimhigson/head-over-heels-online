import { imageStatsStore } from "../imageDiff/imageStats.ts";
import { isImagePath } from "../imagePaths.ts";
import { stats, statusLabel } from "../payload.ts";
import { blockOfTier, sizeTierOfImagePercent, sizeTierOfLines } from "../sizeTier.ts";
import { useStore } from "../stores.ts";

export type FileStatusChipProps = { path: string; status: string };

const percentLabel = (percent: number): string => (percent < 0.1 ? "<0.1" : percent.toFixed(1));

/** one chip for a file's status and how much it costs to review: the status
    letter, then a solid block per changed line count, growing with it - a
    green one for added, a red one for removed. Images have no lines, so they
    get one block sized by % of pixels changed instead. */
export const FileStatusChip = ({ path, status }: FileStatusChipProps) => {
  const imageStats = useStore(imageStatsStore)[path];
  const label = statusLabel[status] ?? status;

  if (isImagePath(path)) {
    const pair = imageStats?.type === "pair" ? imageStats : undefined;
    const percent = pair === undefined ? undefined : (pair.count / pair.total) * 100;
    const tier = percent === undefined ? undefined : sizeTierOfImagePercent(percent);
    return (
      <span
        class={`chip chip-small chip-${status}`}
        title={percent === undefined ? label : `${label} — ${percentLabel(percent)}% of pixels changed`}
      >
        <span class="chip-letter">{status}</span>
        {tier !== undefined && (
          <span class={`chip-bar size-${tier}`} aria-hidden="true">
            {blockOfTier[tier]}
          </span>
        )}
      </span>
    );
  }

  const [added, removed] = stats[path] ?? [0, 0];
  const addedTier = sizeTierOfLines(added);
  const removedTier = sizeTierOfLines(removed);
  return (
    <span class={`chip chip-small chip-${status}`} title={`${label} — +${added} −${removed}`}>
      <span class="chip-letter">{status}</span>
      <span class="chip-bar chip-bar-added" aria-hidden="true">
        {blockOfTier[addedTier]}
      </span>
      <span class="chip-bar chip-bar-removed" aria-hidden="true">
        {blockOfTier[removedTier]}
      </span>
    </span>
  );
};
