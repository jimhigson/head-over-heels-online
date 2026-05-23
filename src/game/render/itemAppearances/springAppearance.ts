import { type AnimatedSprite } from "pixi.js";

import { isStoodOn } from "../../../model/StoodOnBy";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";
import { itemAppearanceOutsideView } from "./itemAppearanceOutsideView";
import { type ItemShadowAppearanceOutsideView } from "./shadowMaskAppearances/itemShadowMaskAppearanceForItem";

type SpringRenderProps = {
  compressed: boolean;
};

/**
 * cases:
 *    was            now                                               render
 *    ===            ===                                               ===
 *
 *    stood on       !stood on     // (indicated with stoodOnUntil)    play bounce anim once. stop on last frame (released)
 *    stood on       stood on                                          'no-update'
 *    !stood on      stood on                                          'no-update'
 *    !stood on      stood on                                          go to 2nd frame of anim (compressed)
 */

const springAppearanceImpl: (
  isShadowMask: boolean,
) => ItemAppearance<"spring", SpringRenderProps, AnimatedSprite> =
  (isShadowMask: boolean) =>
  ({
    renderContext: {
      item: {
        state: { stoodOnBy, stoodOnUntilRoomTime },
      },
      general: { paused, spritesheetVariants },
    },
    tickContext: { lastRenderRoomTime },
    currentRendering,
  }) => {
    const currentlyRenderedProps = currentRendering?.renderProps;
    const compressed = isStoodOn(stoodOnBy);

    let rendering: AnimatedSprite;
    if (currentRendering?.output) {
      rendering = currentRendering?.output;
    } else {
      rendering = createSprite({
        animationId:
          isShadowMask ? "shadowMask.spring.bounce" : "spring.bounce",
        paused,
        spritesheet: spritesheetVariants.currentMainSpritesheet(),
      });
      rendering.loop = false;
      rendering.gotoAndStop(rendering.totalFrames - 1);
    }

    const boing =
      lastRenderRoomTime !== undefined &&
      stoodOnUntilRoomTime > lastRenderRoomTime &&
      // spring could have stopped being stood on, but immediately been stood on again:
      !compressed;

    if (boing && !paused) {
      rendering.gotoAndPlay(0);
    } else {
      const missmatch =
        compressed !== (currentlyRenderedProps?.compressed ?? false);

      if (missmatch) {
        if (compressed) {
          // this frame has to be the 'compressed' frame for this to work:
          rendering.gotoAndStop(rendering.totalFrames - 2);
        } else {
          // released case - this isn't technically needed for the item renderer, since
          // the animation will naturally get to the last frame and stop. However, for the
          // shadow mask this is necessary if the shadow goes away before the animation
          // finishes and then comes back onto the spring again later
          rendering.gotoAndStop(rendering.totalFrames - 1);
        }
      }
    }

    return {
      output: rendering,
      renderProps: { compressed },
    };
  };

export const springAppearance = itemAppearanceOutsideView(
  springAppearanceImpl(false),
);
export const springShadowMaskAppearance = itemAppearanceOutsideView(
  springAppearanceImpl(true),
) as ItemShadowAppearanceOutsideView<"spring">;
