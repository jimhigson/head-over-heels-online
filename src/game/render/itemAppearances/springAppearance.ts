import { type AnimatedSprite } from "pixi.js";

import { isStoodOn } from "../../../model/StoodOnBy";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { spriteFlipXAtAngle } from "../../../utils/vectors/resolveCameraRelativeVector";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";
import { itemAppearanceOutsideView } from "./itemAppearanceOutsideView";
import { type ItemShadowAppearanceOutsideView } from "./shadowMaskAppearances/itemShadowMaskAppearanceForItem";

type SpringRenderProps = {
  compressed: boolean;
  /**
   * the {@link BaseItemState.stoodOnUntilRoomTime} stamp as of the last
   * render - a change means a stander stepped off since then
   */
  stoodOnUntilRoomTime: number;
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
      isReflection,
      item: {
        state: { stoodOnBy, stoodOnUntilRoomTime },
      },
      general: { paused, spritesheets, cameraAngle },
    },
    currentRendering,
  }) => {
    const currentlyRenderedProps = currentRendering?.renderProps;
    const compressed = isStoodOn(stoodOnBy);

    let rendering: AnimatedSprite;
    if (currentRendering?.output) {
      rendering = currentRendering?.output;
    } else {
      rendering = createSprite({
        // shadow-mask art is never palette-swopped, so only the visible spring
        // takes the reflection recolour:
        animationId:
          isShadowMask ?
            "shadowMask.spring.bounce"
          : variantTextureId(
              "spring.bounce",
              isReflection,
              false,
              false,
              false,
            ),
        paused,
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      });
      rendering.loop = false;
      rendering.gotoAndStop(rendering.totalFrames - 1);
    }

    if (!isShadowMask) {
      // the coil flips on odd quarter turns so its painted highlight stays on
      // its world side (light source fixed in the world); the mask is a
      // symmetric silhouette so needs no flip:
      rendering.scale.x = spriteFlipXAtAngle(cameraAngle) ? -1 : 1;
    }

    const boing =
      // never on the first render - a stale stamp (eg from a loaded save) is
      // not a fresh release:
      currentlyRenderedProps !== undefined &&
      stoodOnUntilRoomTime !== currentlyRenderedProps.stoodOnUntilRoomTime &&
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
      renderProps: { compressed, stoodOnUntilRoomTime },
    };
  };

export const springAppearance = itemAppearanceOutsideView(
  springAppearanceImpl(false),
);
export const springShadowMaskAppearance = itemAppearanceOutsideView(
  springAppearanceImpl(true),
) as ItemShadowAppearanceOutsideView<"spring">;
