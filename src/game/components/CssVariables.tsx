import "react";
import type { PropsWithChildren } from "react";
import { useTotalUpscale } from "../../store/selectors";

declare module "react" {
  interface CSSProperties {
    [`--scale`]?: number | string;
    [`--block`]?: number | string;
  }
}

/** TODO: this could be written to the body via an effect */
export const CssVariables = ({
  children,
  scaleFactor: propsScaleFactor,
}: PropsWithChildren<{ scaleFactor?: number }>) => {
  const scaleFactor = useTotalUpscale();

  return (
    <div
      className="contents set-spritesheet-vars"
      style={{
        "--scale": propsScaleFactor ?? scaleFactor,
        "--block": `${(propsScaleFactor ?? scaleFactor) * 8}px`,
      }}
    >
      {children}
    </div>
  );
};
