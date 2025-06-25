import { Container } from "pixi.js";
import type { ItemAppearance } from "./ItemAppearance";
import { emptyObject } from "../../../utils/empty";
import { moveSpeedPixPerMs } from "../../physics/mechanicsConstants";
import { showTextInContainer } from "../hud/showNumberInContainer";
import { OutlineFilter } from "../filters/outlineFilter";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { store } from "../../../store/store";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { blockSizePx } from "../../../sprites/spritePivots";
import { noFilters } from "../filters/standardFilters";
import { selectGameEngineUpscale } from "../../../store/slices/upscale/upscaleSlice";

const floatingTextRiseSpeedPxPerMs = moveSpeedPixPerMs.floatingText;
const lineHeightPx = 12;

/** above this height, lines are hidden */
const maxLineHeight = blockSizePx.h * 3;

const lightening = [
  spritesheetPalette.shadow,
  spritesheetPalette.midGrey,
  spritesheetPalette.redShadow,
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
    mainContainer = new Container({
      filters: new OutlineFilter({
        outlineColor: spritesheetPalette.pureBlack,
        upscale: selectGameEngineUpscale(store.getState()),
        // it is not ok to snap to pixel grid - this needs to render between pixels while scrolling up
        lowRes: false,
      }),
    });
    frontLayer?.attach(mainContainer);

    // add all lines early, even if some will be hidden right away:
    for (let i = 0; i < textLines.length; i++) {
      const textLine = textLines[i];
      const lineContainer = showTextInContainer(
        new Container({
          label: textLine,
          y: i * lineHeightPx,
          filters:
            uncolourised ? noFilters : (
              new RevertColouriseFilter(spritesheetPalette.pink)
            ),
        }),
        textLine.toUpperCase(),
      );
      mainContainer.addChild(lineContainer);
    }
  } else {
    mainContainer = previousRendering!;
  }

  // set line colours/visibility (every frame):
  for (let i = 0; i < textLines.length; i++) {
    const lineContainer = mainContainer.children[i];
    const [lineColourFilter] = lineContainer.filters as
      | [RevertColouriseFilter]
      | [];

    const lineHeight = itemRenderHeight + i * -lineHeightPx;

    const visible = lineHeight > 0 && lineHeight < maxLineHeight;

    lineContainer.visible = visible;

    if (visible && lineColourFilter) {
      const colourIndex = Math.floor(
        (lineHeight / maxLineHeight) * fadeOrderColourised.length,
      );
      lineColourFilter.targetColor = fadeOrderColourised[colourIndex];
    }
  }

  mainContainer.y = -itemRenderHeight;

  return {
    output: mainContainer,
    renderProps: emptyObject,
  };
};
