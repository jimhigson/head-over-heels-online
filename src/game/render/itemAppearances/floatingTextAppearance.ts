import { type BitmapText, type Color, Container } from "pixi.js";

import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type AppSpritesheet } from "../../../sprites/spritesheet/variants/AppSpritesheet";
import { getAmbientSwoppedColour } from "../../../utils/palette/palette";
import {
  blockSizePx,
  moveSpeedPixPerMs,
} from "../../physics/mechanicsConstants";
import { createHudText } from "../text/createHudText";
import { type ItemAppearance } from "./ItemAppearance";

const floatingTextRiseSpeedPxPerMs = moveSpeedPixPerMs.floatingText;
const lineHeightPx = 12;

/** above this height, lines are hidden */
const maxLineHeight = blockSizePx.z * 3;

const buildFadeOrder = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
  spritesheet: AppSpritesheet,
): Color[] => {
  const variant = spritesheet;
  const lightening = spritesheetMeta.floatingTextGradient.map((name) =>
    getAmbientSwoppedColour(spritesheetMeta.palette, name, variant.ambient),
  );
  const peakColour = lightening[lightening.length - 1];
  return [
    ...lightening,
    ...new Array<Color>(20).fill(peakColour),
    ...lightening.toReversed(),
  ];
};

type FloatingTextRenderProps = {
  fadeOrder: Color[];
};

export const floatingTextAppearance: ItemAppearance<
  "floatingText",
  FloatingTextRenderProps
> = ({
  renderContext: {
    isReflection,
    item: {
      config: { textLines, appearanceRoomTime = 0, sway },
    },
    room: { roomTime },
    general: { spritesheetVariants, spritesheetMeta },
    frontLayer,
  },
  currentRendering,
}) => {
  // cache the fade order on renderProps between frames — the result only
  // changes when the current-room spritesheet variant is rebuilt, at which
  // point the room renderer itself is recreated (taking its renderProps with it)
  const fadeOrder =
    currentRendering ?
      currentRendering.renderProps.fadeOrder
    : buildFadeOrder(
        spritesheetMeta,
        spritesheetVariants.currentMainSpritesheet(false, false, isReflection),
      );
  const previousRendering = currentRendering?.output;
  let mainContainer: Container<BitmapText>;

  const age = roomTime - appearanceRoomTime;

  const itemRenderHeight = age * floatingTextRiseSpeedPxPerMs;

  if (previousRendering === undefined) {
    mainContainer = new Container<BitmapText>();
    frontLayer?.attach(mainContainer);

    // add all lines early, even if some will be hidden right away:
    for (let i = 0; i < textLines.length; i++) {
      const textLine = textLines[i];
      const lineContainer = createHudText({
        y: i * lineHeightPx,
        outline: true,
        text: textLine,
      });
      mainContainer.addChild(lineContainer);
    }
  } else {
    mainContainer = previousRendering as Container<BitmapText>;
  }

  let anyVisible = false;
  // set line colours/visibility (every frame):
  for (let i = 0; i < textLines.length; i++) {
    const lineContainer = mainContainer.children[i];

    const lineHeight = itemRenderHeight + i * -lineHeightPx;

    const visible = lineHeight > 0 && lineHeight < maxLineHeight;

    lineContainer.visible = visible;
    anyVisible ||= visible;

    if (visible && sway) {
      lineContainer.x = Math.sin(lineHeight * 0.3) * 4;
    }

    if (visible) {
      const colourIndex = Math.floor(
        (lineHeight / maxLineHeight) * fadeOrder.length,
      );
      lineContainer.tint = fadeOrder[colourIndex];
    }
  }

  // pixi crashes sometimes if we destroy renderers and there are filters
  // in render layers (???) - this can be avoided by making the container
  // not visible when it isn't needed - this means it will be invisible when
  // it its renderer is destroyed/removed
  mainContainer.visible = anyVisible;

  mainContainer.y = -itemRenderHeight;

  return {
    output: mainContainer,
    renderProps: { fadeOrder },
  };
};
