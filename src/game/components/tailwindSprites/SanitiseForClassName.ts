export type SanitisedForClassName<S extends string> =
  S extends `${infer Start}.${infer Rest}` ?
    `${Start}_${SanitisedForClassName<Rest>}`
  : S;

export const sanitiseForClassName = <S extends string>(s: S) =>
  // spritesheet texture/anim ids contain dots. This is fine in tailwind, but monaco editor strips
  // them out. To make decorations in monaco with sprites, we need to remove the dots
  // TODO: the better fix would be to rename all textures to not use dots!
  // regex with negative lookahead to avoid replacing a dot that is preceded by another dot
  // eg - dots are separators, but can also be in the data. This:
  //    texture._  => texture__
  //    texture..  => texture_.
  //
  // Tailwind v4's addUtilities only accepts plain [a-zA-Z0-9_-] class names
  // (v3 tolerated CSS-escaped specials), so after the dot handling any
  // remaining unsafe char is encoded by codepoint. Applied here, the single
  // source for both the plugin's generated selectors and the runtime class
  // names, so the two always agree.
  s
    .replaceAll(/(?<!\.)\./g, "_")
    .replaceAll(
      /[^a-zA-Z0-9_-]/g,
      (ch) => `u${ch.codePointAt(0)!.toString(16)}`,
    ) as SanitisedForClassName<S>;
