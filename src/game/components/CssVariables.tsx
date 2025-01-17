import "react";
import type { PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";
import { useTotalUpscale } from "@/store/selectors";

declare module "react" {
  interface CSSProperties {
    [`--scale`]?: number | string;
    [`--block`]?: number | string;
  }
}

/** TODO: this could be written to the body via an effect */
export const CssVariables = ({ children }: PropsWithChildren<EmptyObject>) => {
  const scaleFactor = useTotalUpscale();

  return (
    <div
      className="contents set-spritesheet-vars"
      style={{
        "--scale": scaleFactor,
        "--block": `${scaleFactor * 8}px`,
      }}
    >
      {children}
    </div>
  );
};
