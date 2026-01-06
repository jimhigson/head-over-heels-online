import { Container } from "pixi.js";

import type { ItemAppearance } from "./ItemAppearance";

import { spritesheetPalette } from "../../../sprites/palette/spritesheetPalette";
import { emptyObject } from "../../../utils/empty";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { moveSpeedPixPerMs } from "../../physics/mechanicsConstants";
import { TextContainer } from "../text/TextContainer";

const floatingTextRiseSpeedPxPerMs = moveSpeedPixPerMs.floatingText;
const lineHeightPx = 12;

/** above this height, lines are hidden */
const maxLineHeight = blockSizePx.z * 3;

const lightening = [
  spritesheetPalette.shadow,
  spritesheetPalette.redShadow,
  spritesheetPalette.midGrey,
  spritesheetPalette.metallicBlue,
  spritesheetPalette.midRed,
  spritesheetPalette.moss,
  spritesheetPalette.pink,
  spritesheetPalette.lightBeige,
  spritesheetPalette.pastelBlue,
  spritesheetPalette.lightGrey,
  spritesheetPalette.highlightBeige,
];

const fadeOrderColourised = [
  ...lightening,
  ...new Array(20).fill(spritesheetPalette.white),
  ...lightening.toReversed(),
];

// in zx it isn't colourised anyway so this doesn't matter
// const fadeOrderZx = [
//   zxSpectrumColors.zxWhite,
//   zxSpectrumColors.zxYellow,
//   zxSpectrumColors.zxCyan,
//   zxSpectrumColors.zxGreen,
//   zxSpectrumColors.zxRed,
//   zxSpectrumColors.zxMagenta,
//   zxSpectrumColors.zxBlue,
// ];

export const floatingTextAppearance: ItemAppearance<"floatingText"> = ({
  renderContext: {
    item: {
      config: { textLines, appearanceRoomTime },
    },
    room: { roomTime },
    general: {
      displaySettings: { uncolourised },
      pixiRenderer,
    },
    frontLayer,
  },
  currentRendering,
}) => {
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

    if (visible && !uncolourised) {
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
    renderProps: emptyObject,
  };
};
