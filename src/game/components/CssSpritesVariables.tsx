import { type PropsWithChildren } from "preact/compat";
import { type EmptyObject } from "type-fest";

import { useSpriteStylesheet } from "../../sprites/css/useSpriteStylesheet";
import { useAppSelector } from "../../store/hooks";
import {
  selectSpritesOption,
  useCurrentSpritesheetData,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import { selectSpritesheetOverrideBlobUrl } from "../../store/slices/spritesheetOverrideSlice";

declare module "preact" {
  // augmenting preact's JSX.CSSProperties requires a namespace here
  // eslint-disable-next-line no-namespace
  namespace JSX {
    interface CSSProperties {
      [`--spritesheetUrl`]?: string;
    }
  }
}

/**
 * Sets the CSS variable (`--spritesheetUrl`) and the
 * `set-spritesheet-vars` / `toppy-spritesheet` / `blockstack-spritesheet`
 * classnames with values from the user-settings slice (currently selected
 * sprites option) and the spritesheet-override slice (optional blob URL).
 *
 * Also adopts the current spritesheet's `.texture-*` crop stylesheet into the
 * document, since the crops are a property of the selected sheet too.
 */
export const CssSpritesVariables = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const spritesOption = useAppSelector(selectSpritesOption);
  useSpriteStylesheet(useCurrentSpritesheetData());
  const overrideBlobUrl =
    import.meta.env.VITE_APP === "editor" ?
      undefined
      // oxlint-disable-next-line react-hooks/rules-of-hooks -- build-time macro, not run-time conditional
    : useAppSelector((state) =>
        selectSpritesheetOverrideBlobUrl(state, spritesOption.name),
      );

  return (
    <div
      class={`contents set-spritesheet-vars ${spritesOption.name === "Toppy" ? "toppy-spritesheet" : "blockstack-spritesheet"}`}
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
