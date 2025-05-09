import type { AnimatedSprite } from "pixi.js";
import { isStoodOn } from "../../../model/StoodOnBy";
import { createSprite } from "../createSprite";
import type { ItemAppearance } from "./ItemAppearance";
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

const springAppearanceImpl: ItemAppearance<
  "spring",
  SpringRenderProps,
  AnimatedSprite
> = ({
  renderContext: {
    item: {
      state: { stoodOnBy, stoodOnUntilRoomTime },
    },
    general: { paused },
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
      animationId: "spring.bounce",
    });
    rendering.loop = false;
    rendering.gotoAndStop(0);
  }

  const boing =
    lastRenderRoomTime !== undefined &&
    stoodOnUntilRoomTime > lastRenderRoomTime &&
    // it could have stopped being stood on, but immediately been stood on again:
    !compressed;

  if (boing && !paused) {
    rendering.gotoAndPlay(0);
  } else {
    if (compressed && !(currentlyRenderedProps?.compressed ?? false)) {
      rendering.gotoAndStop(1);
    }
    // no need to handle the released case - this will be handled by the animation staying on the lsat frame,
    // which is the released spring
  }

  return {
    output: rendering,
    renderProps: { compressed },
  };
};

export const springAppearance = itemAppearanceOutsideView(springAppearanceImpl);
