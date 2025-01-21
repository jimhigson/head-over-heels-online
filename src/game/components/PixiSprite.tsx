import { Application } from "pixi.js";
import { createSprite } from "../render/createSprite";
import { useState, useEffect } from "react";
import { spritesheetData, type TextureId } from "../../sprites/spriteSheetData";
import { twMerge } from "tailwind-merge";
import { useTotalUpscale } from "../../store/selectors";
import {
  spritesheetPalette,
  type SpritesheetPaletteColourName,
} from "../../../gfx/spritesheetPalette";
import { RevertColouriseFilter } from "../../filters/colorReplace/RevertColouriseFilter";

export interface PixiSpriteProps {
  revertColourTo?: SpritesheetPaletteColourName;
  textureId: TextureId;
  className?: string;
}

/** displays one sprite from the spritesheet */
export const PixiSprite = ({
  textureId,
  className,
  revertColourTo,
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

      if (revertColourTo !== undefined) {
        sprite.filters = [
          new RevertColouriseFilter(spritesheetPalette[revertColourTo]),
        ];
      }

      app.stage.addChild(sprite);
    };

    asyncEffect();

    return () => {
      containerEle.removeChild(app.canvas);
      app.destroy();
    };
  }, [containerEle, revertColourTo, textureId]);

  return (
    <span
      className={twMerge("block", className)}
      style={{ width: `${w * scale}px`, height: `${h * scale}px` }}
      ref={setContainerEle}
    />
  );
};
