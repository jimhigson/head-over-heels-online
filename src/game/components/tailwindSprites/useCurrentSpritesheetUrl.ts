import blockStackSpritesheetUrl from "../../../../gfx/sprites.webp";
import toppySpritesheetUrl from "../../../../gfx/spritesToppy.webp";
import { useAppSelector } from "../../../store/hooks";
import { selectSpritesOption } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { selectSpritesheetOverrideBlobUrl } from "../../../store/slices/spritesheetOverrideSlice";

/**
 * The runtime URL of the spritesheet image for the currently-selected sprites
 * option, honouring a user-supplied override if one is set.
 *
 * Unlike the `--spritesheetUrl` CSS variable (used by the CSS-background sprites),
 * this is a real, build-hashed URL string suitable for an SVG `<image href>`,
 * which cannot read CSS custom properties.
 */
export const useCurrentSpritesheetUrl = (): string => {
  const spriteOption = useAppSelector(selectSpritesOption);
  const overrideBlobUrl =
    import.meta.env.VITE_APP === "editor" ?
      undefined
      // oxlint-disable-next-line react-hooks/rules-of-hooks -- build-time macro, not run-time conditional
    : useAppSelector((state) =>
        selectSpritesheetOverrideBlobUrl(state, spriteOption.name),
      );

  return (
    overrideBlobUrl ??
    (spriteOption.name === "Toppy" ?
      toppySpritesheetUrl
    : blockStackSpritesheetUrl)
  );
};
