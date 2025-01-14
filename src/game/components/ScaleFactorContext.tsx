import type { PropsWithChildren } from "react";
import { createContext } from "react";
import spritesheetUrl from "../../../gfx/sprites.png";

import "react";
import { spriteSheet } from "@/sprites/spriteSheet";

declare module "react" {
  interface CSSProperties {
    [`--scale`]?: number | string;
  }
}

export const ScaleFactorContext = createContext<number>(1);
export type ScaleFactorBoundaryProps = PropsWithChildren<{
  scaleFactor: number;
}>;

/** TODO: this could be written to the body via an effect */
export const CssVariables = ({
  scaleFactor,
  children,
}: ScaleFactorBoundaryProps) => {
  const { width: spritesheetW, height: spritesheetH } =
    spriteSheet.textureSource;

  return (
    <div
      className="contents"
      style={{
        "--scale": scaleFactor,
        "--spritesheetUrl": `url('${spritesheetUrl}')`,
        "--spritesheetW": `${spritesheetW}px`,
        "--spritesheetH": `${spritesheetH}px`,
        "--doubleHeight": "1",
      }}
    >
      {children}
    </div>
  );
};
export const ScaleBoundary = ({
  scaleFactor,
  children,
}: ScaleFactorBoundaryProps) => {
  return (
    <CssVariables scaleFactor={scaleFactor}>
      <ScaleFactorContext value={scaleFactor}>{children}</ScaleFactorContext>
    </CssVariables>
  );
};
