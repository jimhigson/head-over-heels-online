const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const divisions = [
  [60, "second"],
  [60, "minute"],
  [24, "hour"],
  [7, "day"],
  [4.345_24, "week"],
  [12, "month"],
] as const satisfies ReadonlyArray<
  readonly [number, Intl.RelativeTimeFormatUnit]
>;

/**
 * human-readable relative time, eg "5 minutes ago", "yesterday", "last week"
 */
export const timeAgo = (
  /** past (or future) time as an epoch ms number, ISO string, or Date */
  timestamp: Date | number | string,
): string => {
  let delta = (new Date(timestamp).getTime() - Date.now()) / 1_000;
  for (const [amount, unit] of divisions) {
    if (Math.abs(delta) < amount) {
      return rtf.format(Math.round(delta), unit);
    }
    delta /= amount;
  }
  return rtf.format(Math.round(delta), "year");
};
