import "react";
import type { PropsWithChildren } from "react";
import { useTotalUpscale } from "../../store/selectors";
import spritesheetUrl from "../../assets/sprites.png";

declare module "react" {
  interface CSSProperties {
    [`--scale`]?: number | string;
    [`--block`]?: number | string;
    [`--spritesheetUrl`]?: string;
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
        "--spritesheetUrl": `url('${spritesheetUrl}')`,
        "--scale": propsScaleFactor ?? scaleFactor,
        "--block": `${(propsScaleFactor ?? scaleFactor) * 8}px`,
      }}
    >
      {children}
    </div>
  );
};
