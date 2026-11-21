import { type PropsWithChildren } from "preact/compat";
import { type EmptyObject } from "type-fest";

import { useAddCssToDomForCurrentSpritesheet } from "../../sprites/css/useAddCssToDomForCurrentSpritesheet";
import { useAppSelector } from "../../store/hooks";
import { selectSpritesheetName } from "../../store/slices/gameMenus/gameMenusSelectors";

/**
 * Adds the current spritesheet's css into the document, and wraps the children
 * in the classes it applies under: `set-spritesheet-vars`, which its variables
 * are set on, and `toppy-spritesheet` for the `toppy:` variant
 */
export const CssSpritesVariables = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  useAddCssToDomForCurrentSpritesheet();
  const spritesheetName = useAppSelector(selectSpritesheetName);
  return (
    <div
      // toppy-spritesheet is needed for the tailwind variant `toppy:`
      class={`contents set-spritesheet-vars ${spritesheetName === "toppy" ? "toppy-spritesheet" : ""}`}
    >
      {children}
    </div>
  );
};
