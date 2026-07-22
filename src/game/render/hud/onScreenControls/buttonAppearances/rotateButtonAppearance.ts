import { type EmptyObject } from "type-fest";

import { emptyObject } from "../../../../../utils/empty";
import { TextContainer } from "../../../text/TextContainer";
import { type ButtonAppearance } from "../../HudButtonRenderer";
import { tintForHud } from "../../spritesheetVariantForHud";

export type RotateButtonRenderProps = EmptyObject;

type RotateButtonId = "rotateAnticlockwise" | "rotateClockwise";

/**
 * a hud button that turns the camera a quarter-turn, rendered in the same
 * outlined, room-hud-colour-tinted, double-size style as the menu button. The
 * glyph is the same rotate arrow the editor uses ("↻" clockwise, "↺"
 * anticlockwise).
 */
export const rotateButtonAppearance =
  <BT extends RotateButtonId>(
    glyph: "↺" | "↻",
  ): ButtonAppearance<BT, string, RotateButtonRenderProps, TextContainer> =>
  ({ currentRendering, tickContext, renderContext: { general } }) => {
    if (currentRendering !== undefined) {
      currentRendering.output!.tint = tintForHud(
        general.spriteOption,
        tickContext.room.color,
        tickContext.hovered ?? false,
        general.spritesheetMeta,
      );
      return "no-update";
    }

    const output = new TextContainer({
      pixiRenderer: general.pixiRenderer,
      spritesheet: general.spritesheetVariants.originalSpritesheet,
      label: `rotateText.${glyph}`,
      outline: true,
      doubleHeight: true,
      doubleWidth: true,
      text: glyph,
      colour: tintForHud(
        general.spriteOption,
        tickContext.room.color,
        tickContext.hovered ?? false,
        general.spritesheetMeta,
      ),
    });

    return {
      output,
      renderProps: emptyObject,
    };
  };
