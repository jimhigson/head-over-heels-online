/**
 * A texture id shortened to its initials, keeping the last part whole -
 * `head.walking.d2` reads as `h.w.d2`.
 *
 * The tiles are one sprite wide and the names are long enough to be most of
 * the tile; the last part is what tells two sprites of a set apart, so it is
 * the one worth keeping. The full name is a hover away.
 */
export const abbreviatedSpriteName = (name: string): string => {
  const parts = name.split(".");
  return parts
    .map((part, index) =>
      index === parts.length - 1 ? part : ([...part][0] ?? part),
    )
    .join(".");
};
