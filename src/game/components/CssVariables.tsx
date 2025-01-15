import spritesheetUrl from "../../../gfx/sprites.png";

import "react";
import { spriteSheet } from "@/sprites/spriteSheet";
import type { PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";
import { useScaleFactor } from "@/store/selectors";

declare module "react" {
  interface CSSProperties {
    [`--scale`]?: number | string;
    [`--block`]?: number | string;
  }
}

/** TODO: this could be written to the body via an effect */
export const CssVariables = ({ children }: PropsWithChildren<EmptyObject>) => {
  const { width: spritesheetW, height: spritesheetH } =
    spriteSheet.textureSource;

  const scaleFactor = useScaleFactor();

  return (
    <div
      className="contents"
      style={{
        "--scale": scaleFactor,
        "--block": `${scaleFactor * 8}px`,
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
