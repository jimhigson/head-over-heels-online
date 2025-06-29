export type SanitisedForClassName<S extends string> =
  S extends `${infer Start}.${infer Rest}` ?
    `${Start}_${SanitisedForClassName<Rest>}`
  : S;

export const sanitiseForClassName = <S extends string>(s: S) =>
  s.replaceAll(".", "_") as SanitisedForClassName<S>;
