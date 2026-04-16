import { type Color, Container } from "pixi.js";

import type { SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import type { ItemAppearance } from "./ItemAppearance";

import { getSpriteSheetVariant } from "../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { getAmbientSwoppedColour } from "../../../utils/palette/palette";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { moveSpeedPixPerMs } from "../../physics/mechanicsConstants";
import { TextContainer } from "../text/TextContainer";

const floatingTextRiseSpeedPxPerMs = moveSpeedPixPerMs.floatingText;
const lineHeightPx = 12;

/** above this height, lines are hidden */
const maxLineHeight = blockSizePx.z * 3;

const buildFadeOrder = <PaletteColourName extends string>(
  spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
): Color[] => {
  const lightening = spritesheetMeta.floatingTextGradient.map((name) =>
    getAmbientSwoppedColour(
      spritesheetMeta.palette,
      name,
      getSpriteSheetVariant("for-current-room").ambient,
    ),
  );
  const peakColour = lightening[lightening.length - 1];
  return [
    ...lightening,
    ...new Array<Color>(20).fill(peakColour),
    ...lightening.toReversed(),
  ];
};

type FloatingTextRenderProps = {
  fadeOrderColourised: Color[] | undefined;
};

export const floatingTextAppearance: ItemAppearance<
  "floatingText",
  FloatingTextRenderProps
> = ({
  renderContext: {
    item: {
      config: { textLines, appearanceRoomTime },
    },
    room: { roomTime },
    general: { spriteOption, spritesheetMeta, pixiRenderer },
    frontLayer,
  },
  currentRendering,
}) => {
  // cache the fade order on renderProps between frames — the result only
  // changes when the current-room spritesheet variant is rebuilt, at which
  // point the room renderer itself is recreated (taking its renderProps with it)
  const fadeOrderColourised =
    currentRendering ? currentRendering.renderProps.fadeOrderColourised
    : spriteOption.uncolourised ? undefined
    : buildFadeOrder(spritesheetMeta);
  const previousRendering = currentRendering?.output;
  let mainContainer: Container<Container>;

  const age = roomTime - appearanceRoomTime;

  const itemRenderHeight = age * floatingTextRiseSpeedPxPerMs;

  if (previousRendering === undefined) {
    mainContainer = new Container();
    frontLayer?.attach(mainContainer);

    // add all lines early, even if some will be hidden right away:
    for (let i = 0; i < textLines.length; i++) {
      const textLine = textLines[i];
      const lineContainer = new TextContainer({
        pixiRenderer,
        y: i * lineHeightPx,
        outline: true,
        text: textLine.toUpperCase(),
      });
      mainContainer.addChild(lineContainer);
    }
  } else {
    mainContainer = previousRendering!;
  }

  let anyVisible = false;
  // set line colours/visibility (every frame):
  for (let i = 0; i < textLines.length; i++) {
    const lineContainer = mainContainer.children[i];

    const lineHeight = itemRenderHeight + i * -lineHeightPx;

    const visible = lineHeight > 0 && lineHeight < maxLineHeight;

    lineContainer.visible = visible;
    anyVisible ||= visible;

    if (visible && fadeOrderColourised !== undefined) {
      const colourIndex = Math.floor(
        (lineHeight / maxLineHeight) * fadeOrderColourised.length,
      );
      lineContainer.tint = fadeOrderColourised[colourIndex];
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
    renderProps: { fadeOrderColourised },
  };
};
