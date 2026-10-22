import { spritesheetArtSourceUrl } from "../sprites/spritesheet/spritesheetArtSourceUrl";
import { useAppSelector } from "./hooks";
import { useSpritesheetArtName } from "./slices/gameMenus/gameMenusSelectors";

/**
 * The runtime URL of the spritesheet image for the currently-selected sprites
 * option, honouring a user-supplied override if one is set.
 *
 * Unlike the `--spritesheetArtUrl` CSS variable (used by the CSS-background sprites),
 * this is a real, build-hashed URL string suitable for an SVG `<image href>`,
 * which cannot read CSS custom properties.
 */
export const useCurrentSpritesheetArtUrl = (): string => {
  const spritesheetArtName = useSpritesheetArtName();
  return useAppSelector((state) =>
    spritesheetArtSourceUrl(state, spritesheetArtName),
  );
};
