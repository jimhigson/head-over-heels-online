import { rotateDirectionXy4ByCameraAngle } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type LampRenderProps = {
  activated: boolean;
};

export const lampAppearance: ItemAppearance<"lamp", LampRenderProps> = ({
  renderContext: {
    isReflection,
    item: {
      state: { activated },
      config: { direction, times },
    },
    general: { spritesheetVariants, cameraAngle },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const render =
    currentlyRenderedProps === undefined ||
    activated !== currentlyRenderedProps.activated;

  if (!render) {
    return "no-update";
  }

  // rotate the lamp's facing by the camera angle so the directional sprite
  // matches how it appears once the camera has turned:
  const renderedDirection = rotateDirectionXy4ByCameraAngle(
    direction,
    cameraAngle,
  );

  return {
    output: createSprite({
      textureId: `lamp.${activated ? "on" : "off"}.${renderedDirection}`,
      // stacked to double/triple height when the lamp has times.z:
      times,
      cameraAngle,
      // deactivated lamps don't render in the deactivated palette, they have separate 'off' sprites:
      spritesheet: spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      ),
    }),
    renderProps: { activated },
  };
};
