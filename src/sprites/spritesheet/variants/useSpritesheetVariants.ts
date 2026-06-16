import { useEffect, useState } from "preact/hooks";

import { useAppDispatch } from "../../../store/hooks";
import { startAppListening } from "../../../store/listenerMiddleware";
import { withLoadingCaptured } from "../../../store/slices/assetsLoading/assetsLoadingSlice";
import { selectSpritesOption } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { nextSpritesOption } from "../../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../../store/store";
import {
  type LoadableSpriteOption,
  SpritesheetVariants,
} from "./SpritesheetVariants";

/**
 * create a SpritesheetVariants that tracks the user's preferences
 * by loading their selected skin
 */
export const useSpritesheetVariants = (): SpritesheetVariants => {
  const [spritesheetVariants] = useState<SpritesheetVariants>(() => {
    const createdSsv = new SpritesheetVariants();
    createdSsv.loadImage(selectSpritesOption(store.getState()).name);
    return createdSsv;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = startAppListening({
      actionCreator: nextSpritesOption,
      async effect(_action, { getState, getOriginalState }) {
        const spriteOption = selectSpritesOption(getState()).name;
        const originalSpriteOption =
          selectSpritesOption(getOriginalState()).name;
        try {
          await dispatch(
            withLoadingCaptured(() =>
              spritesheetVariants.loadImage(spriteOption),
            ),
          );
        } catch (error) {
          console.error(
            new Error(
              `failed to load spritesheet for sprite option ${spriteOption}, falling back to previous spritesheet ${originalSpriteOption}`,
              { cause: error },
            ),
          );
          // fall back to previous spritesheet if network not available
          await spritesheetVariants.loadImage(originalSpriteOption);
        }
      },
    });
    return () => {
      unsub();
      spritesheetVariants.destroy();
    };
  }, [spritesheetVariants, dispatch]);

  return spritesheetVariants;
};

/**
 * like useSpritesheetVariants but ignores user settings and loads only the given
 * variant
 */
export const useFixedSpritesheetVariants = (
  spriteOption: LoadableSpriteOption,
): SpritesheetVariants => {
  const [spritesheetVariants] = useState<SpritesheetVariants>(() => {
    const createdSsv = new SpritesheetVariants();
    createdSsv.loadImage(spriteOption);
    return createdSsv;
  });

  useEffect(() => {
    return () => {
      spritesheetVariants.destroy();
    };
  }, [spritesheetVariants]);

  return spritesheetVariants;
};
