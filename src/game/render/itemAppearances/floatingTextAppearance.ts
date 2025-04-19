import { Container } from "pixi.js";
import type { ItemAppearance } from "./ItemAppearance";
import { emptyObject } from "../../../utils/empty";
import { moveSpeedPixPerMs } from "../../physics/mechanicsConstants";
import { showTextInContainer } from "../hud/showNumberInContainer";
import { OutlineFilter } from "../filters/outlineFilter";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { store } from "../../../store/store";
import { zxSpectrumColors } from "../../../originalGame";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { blockSizePx } from "../../../sprites/spritePivots";
import { selectIsColourised } from "../../../store/selectors";
import { halfbrite } from "../../../utils/colour/halfBrite";

const floatingTextRiseSpeedPxPerMs = moveSpeedPixPerMs.floatingText;
const lineHeightPx = 12;

/** above this height, lines are hidden */
const maxLineHeight = blockSizePx.h * 3;

const fadeOrderColourised = [
  /*spritesheetPalette.white,
  spritesheetPalette.highlightBeige,
  spritesheetPalette.lightGrey,
  spritesheetPalette.pastelBlue,
  spritesheetPalette.lightBeige,
  spritesheetPalette.pink,
  spritesheetPalette.moss,
  spritesheetPalette.midRed,
  spritesheetPalette.metallicBlue,
  spritesheetPalette.redShadow,
  spritesheetPalette.midGrey,
  spritesheetPalette.shadow,*/
  spritesheetPalette.white,
  spritesheetPalette.pastelBlue,
  spritesheetPalette.metallicBlue,
  halfbrite(spritesheetPalette.pastelBlue),
  halfbrite(spritesheetPalette.metallicBlue),
];
const fadeOrderZx = [
  zxSpectrumColors.zxWhite,
  zxSpectrumColors.zxYellow,
  zxSpectrumColors.zxCyan,
  zxSpectrumColors.zxGreen,
  zxSpectrumColors.zxRed,
  zxSpectrumColors.zxMagenta,
  zxSpectrumColors.zxBlue,
];

export const floatingTextAppearance: ItemAppearance<"floatingText"> = ({
  renderContext: {
    item: {
      config: { textLines, appearanceRoomTime },
    },
    room: { roomTime },
  },
  previousRendering,
}) => {
  let mainContainer: Container<Container>;

  const age = roomTime - appearanceRoomTime;

  const itemRenderHeight = age * floatingTextRiseSpeedPxPerMs;

  if (previousRendering === null) {
    mainContainer = new Container({
      filters: new OutlineFilter({
        outlineColor: spritesheetPalette.pureBlack,
        upscale: store.getState().gameMenus.upscale.gameEngineUpscale,
        // it is not ok to snap to pixel grid - this needs to render between pixels while scrolling up
        lowRes: false,
      }),
    });

    // add all lines early, even if some will be hidden right away:
    for (let i = 0; i < textLines.length; i++) {
      const textLine = textLines[i];
      const lineContainer = showTextInContainer(
        new Container({
          label: textLine,
          y: i * lineHeightPx,
          filters: new RevertColouriseFilter(spritesheetPalette.pink),
        }),
        textLine.toUpperCase(),
      );
      mainContainer.addChild(lineContainer);
    }
  } else {
    mainContainer = previousRendering!;
  }

  // set line colours/visibility (every frame):
  const isColourised = selectIsColourised(store.getState());
  const colourFadeOrder = isColourised ? fadeOrderColourised : fadeOrderZx;
  for (let i = 0; i < textLines.length; i++) {
    const lineContainer = mainContainer.children[i];
    const [lineFilter] = lineContainer.filters as [RevertColouriseFilter];

    const lineHeight = itemRenderHeight + i * -lineHeightPx;

    const visible = lineHeight > 0 && lineHeight < maxLineHeight;

    lineContainer.visible = visible;

    if (visible) {
      const colourIndex = Math.floor(
        (lineHeight / maxLineHeight) * colourFadeOrder.length,
      );
      lineFilter.targetColor = colourFadeOrder[colourIndex];
    }
  }

  mainContainer.y = -itemRenderHeight;

  return {
    output: mainContainer,
    renderProps: emptyObject,
  };
};
