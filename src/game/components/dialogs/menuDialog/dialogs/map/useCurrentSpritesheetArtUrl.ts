import blockstackSpritesheetArtUrl from "../../../../../../../gfx/spritesBlockstack.webp";
import toppySpritesheetArtUrl from "../../../../../../../gfx/spritesToppy.webp";
import { useAppSelector } from "../../../../../../store/hooks";
import { useSpritesheetArtName } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { selectSpritesheetOverrideBlobUrl } from "../../../../../../store/slices/spritesheetOverrideSlice";

/**
 * The runtime URL of the spritesheet image for the currently-selected sprites
 * option, honouring a user-supplied override if one is set.
 *
 * Unlike the `--spritesheetArtUrl` CSS variable (used by the CSS-background sprites),
 * this is a real, build-hashed URL string suitable for an SVG `<image href>`,
 * which cannot read CSS custom properties.
 */
export const useCurrentSpritesheetArtUrl = (): string => {
  const selectedSpritesheetArtName = useSpritesheetArtName();
  const overrideBlobUrl =
    import.meta.env.VITE_APP === "editor" ?
      undefined
      // oxlint-disable-next-line react-hooks/rules-of-hooks -- build-time macro, not run-time conditional
    : useAppSelector((state) =>
        selectSpritesheetOverrideBlobUrl(state, selectedSpritesheetArtName),
      );

  return (
    overrideBlobUrl ??
    (selectedSpritesheetArtName === "toppy" ?
      toppySpritesheetArtUrl
    : blockstackSpritesheetArtUrl)
  );
};
