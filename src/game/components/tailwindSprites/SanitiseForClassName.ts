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
  //    texture..  => texture_.       <- means this can never be used in a monaco decoration, but it is the only texture that can't
  s.replaceAll(/(?<!\.)\./g, "_") as SanitisedForClassName<S>;
