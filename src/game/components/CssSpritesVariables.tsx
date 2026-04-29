import "react";
import type { PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";

import { useAppSelector } from "../../store/hooks";
import { selectSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { selectSpritesheetOverrideBlobUrl } from "../../store/slices/spritesheetOverrideSlice";

declare module "react" {
  interface CSSProperties {
    [`--spritesheetUrl`]?: string;
  }
}

/**
 * Sets the CSS variable (`--spritesheetUrl`) and the
 * `set-spritesheet-vars` / `toppy-spritesheet` / `blockstack-spritesheet`
 * classnames with values from the user-settings slice (currently selected
 * sprites option) and the spritesheet-override slice (optional blob URL).
 */
export const CssSpritesVariables = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const spritesOption = useAppSelector(selectSpritesOption);
  const overrideBlobUrl = useAppSelector((state) =>
    selectSpritesheetOverrideBlobUrl(state, spritesOption.name),
  );

  return (
    <div
      className={`contents set-spritesheet-vars ${spritesOption.name === "Toppy" ? "toppy-spritesheet" : "blockstack-spritesheet"}`}
      style={
        overrideBlobUrl !== undefined ?
          { "--spritesheetUrl": `url('${overrideBlobUrl}')` }
        : undefined
      }
    >
      {children}
    </div>
  );
};
