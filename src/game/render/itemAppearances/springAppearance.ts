import type { AnimatedSprite } from "pixi.js";

import type { ItemAppearance } from "./ItemAppearance";
import type { ItemShadowAppearanceOutsideView } from "./shadowMaskAppearances/shadowMaskAppearanceForitem";

import { isStoodOn } from "../../../model/StoodOnBy";
import { createSprite } from "../createSprite";
import { itemAppearanceOutsideView } from "./itemAppearanceOutsideView";

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
      general: { paused, colourised },
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
        spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
      });
      rendering.loop = false;
      rendering.gotoAndStop(0);
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
          rendering.gotoAndStop(1);
        } else {
          // released case - this isn't technically needed for the item renderer, since
          // the animation will naturally get to the last frame and stop. However, for the
          // shadow mask this is necessary if the shadow goes away before the animation
          // finishes and then comes back onto the spring again later
          rendering.gotoAndStop(0);
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
