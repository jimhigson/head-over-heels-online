import "react";
import type { PropsWithChildren } from "react";

import type { LoadableSpriteOption } from "../../sprites/spritesheet/loadedSpriteSheet";

import { useAppSelector } from "../../store/hooks";
import { selectSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { selectSpritesheetOverrideBlobUrl } from "../../store/slices/spritesheetOverrideSlice";
import { useTotalUpscale } from "../../store/slices/upscale/upscaleSelectors";

declare module "react" {
  interface CSSProperties {
    [`--scale`]?: number | string;
    [`--block`]?: number | string;
    [`--spritesheetUrl`]?: string;
  }
}
export const CssVariables = ({
  children,
  scaleFactor: propsScaleFactor,
}: PropsWithChildren<{ scaleFactor?: number }>) => {
  const scaleFactor = useTotalUpscale();
  const spritesOption = useAppSelector(selectSpritesOption);
  const loadable: LoadableSpriteOption =
    spritesOption === "Speccy" ? "BlockStack" : spritesOption;
  const overrideBlobUrl = useAppSelector((state) =>
    selectSpritesheetOverrideBlobUrl(state, loadable),
  );

  return (
    <div
      className={`contents set-spritesheet-vars ${spritesOption === "Toppy" ? "toppy-spritesheet" : "blockstack-spritesheet"}`}
      style={{
        "--scale": propsScaleFactor ?? scaleFactor,
        "--block": `${(propsScaleFactor ?? scaleFactor) * 8}px`,
        ...(overrideBlobUrl !== undefined && {
          "--spritesheetUrl": `url('${overrideBlobUrl}')`,
        }),
      }}
    >
      {children}
    </div>
  );
};
