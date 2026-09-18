/**
 * A texture id shortened -
 * `head.walking.d2` becomes `h.w.d2`.
 */
export const abbreviatedSpriteName = (name: string): string => {
  const parts = name.split(".");
  return parts
    .map((part, index) =>
      index === parts.length - 1 ? part : ([...part][0] ?? part),
    )
    .join(".");
};
