import { Application } from "pixi.js";
import { createSprite } from "../render/createSprite";
import { useState, useEffect } from "react";
import { spritesheetData, type TextureId } from "../../sprites/spriteSheetData";
import { twMerge } from "tailwind-merge";
import { useTotalUpscale } from "../../store/selectors";
import { RevertColouriseFilter } from "../../filters/colorReplace/RevertColouriseFilter";

export interface PixiSpriteProps {
  // if given, colour is reverted to the currentColor (the text colour from css)
  revertColour?: boolean;
  textureId: TextureId;
  className?: string;
}

/** displays one sprite from the spritesheet */
export const PixiSprite = ({
  textureId,
  className,
  revertColour,
}: PixiSpriteProps) => {
  const [containerEle, setContainerEle] = useState<HTMLSpanElement | null>(
    null,
  );

  const {
    frame: { w, h },
  } = spritesheetData.frames[textureId];

  const scale = useTotalUpscale();

  useEffect(() => {
    if (containerEle === null) return;

    const app = new Application();

    const asyncEffect = async () => {
      await app.init({ backgroundAlpha: 0, resizeTo: containerEle });
      containerEle.appendChild(app.canvas);
      const sprite = createSprite(textureId);

      sprite.x = containerEle.clientWidth / 2;
      sprite.y = containerEle.clientHeight;
      sprite.scale = containerEle.clientWidth / sprite.width;

      if (revertColour) {
        const { color } = window.getComputedStyle(containerEle);
        sprite.filters = [new RevertColouriseFilter(color)];
      }

      app.stage.addChild(sprite);
    };

    asyncEffect();

    return () => {
      containerEle.removeChild(app.canvas);
      app.destroy();
    };
  }, [containerEle, revertColour, textureId]);

  return (
    <span
      className={twMerge("block", className)}
      style={{ width: `${w * scale}px`, height: `${h * scale}px` }}
      ref={setContainerEle}
    />
  );
};
