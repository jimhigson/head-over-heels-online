import type { FC } from "react";

export const HookComponent =
  <P,>(hook: (props: P) => void): FC<P> =>
  (p: P) => {
    hook(p);
    return null;
  };
