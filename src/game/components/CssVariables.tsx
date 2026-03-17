import "react";
import type { PropsWithChildren } from "react";

import { useAppSelector } from "../../store/hooks";
import { selectSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { useTotalUpscale } from "../../store/slices/upscale/upscaleSelectors";

declare module "react" {
  interface CSSProperties {
    [`--scale`]?: number | string;
    [`--block`]?: number | string;
  }
}
export const CssVariables = ({
  children,
  scaleFactor: propsScaleFactor,
}: PropsWithChildren<{ scaleFactor?: number }>) => {
  const scaleFactor = useTotalUpscale();
  const spritesOption = useAppSelector(selectSpritesOption);

  return (
    <div
      className={`contents set-spritesheet-vars ${spritesOption === "Toppy" ? "toppy-spritesheet" : ""}`}
      style={{
        "--scale": propsScaleFactor ?? scaleFactor,
        "--block": `${(propsScaleFactor ?? scaleFactor) * 8}px`,
      }}
    >
      {children}
    </div>
  );
};
