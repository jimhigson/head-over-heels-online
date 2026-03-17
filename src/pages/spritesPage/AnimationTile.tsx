import { useEffect, useRef } from "react";

import type { AppSpritesheetData } from "../../sprites/spritesheet/loadedSpriteSheet";
import type {
  FramesWithSpeed,
  TextureId,
} from "../../sprites/spritesheet/spritesheetData/spriteSheetData";

import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  animatedSpriteSpecificCssVars,
  keyframesForAnimatedSprite,
} from "../../tailwind/plugins/spriteCss";
import { Tooltip } from "../../ui/Tooltip";
import { keyframesToCss } from "./keyframesToCss";
import { SpriteName } from "./SpriteName";

export type AnimationTileProps = {
  animationName: string;
  frames: FramesWithSpeed<TextureId[]>;
  spritesheetData: AppSpritesheetData;
};

export const AnimationTile = ({
  animationName,
  frames,
  spritesheetData,
}: AnimationTileProps) => {
  const styleRef = useRef<HTMLStyleElement>(null);
  const spriteOption = useSpritesOption();

  const missingFrameIds = frames.filter((f) => !(f in spritesheetData.frames));

  useEffect(() => {
    if (styleRef.current && missingFrameIds.length === 0) {
      styleRef.current.textContent = keyframesToCss(
        keyframesForAnimatedSprite(
          animationName,
          sanitiseForClassName,
          frames,
          spritesheetData,
        ),
      );
    }
  }, [animationName, frames, spritesheetData, missingFrameIds.length]);

  return (
    <div
      className="bg-shadow zx:bg-zxRedDimmed m-[4px] p-[8px] text-left flex flex-col w-8"
      data-animation-id={animationName}
    >
      <style ref={styleRef} />
      {missingFrameIds.length > 0 ?
        <div className="text-midRed zx:text-zxRed">
          missingFrame: {missingFrameIds[0]}
        </div>
      : <div
          className={`sprite bg-pureBlack zx:bg-zxBlack hover:bg-moss zx:hover:bg-zxYellow border-shadow zx:border-zxRedDimmed box-content w-min
          ${spriteOption === "Speccy" ? "sprite-revert-to-two-tone" : ""}`}
          style={animatedSpriteSpecificCssVars(
            animationName,
            sanitiseForClassName,
            frames,
            spritesheetData,
          )}
        />
      }
      <div className="flex-grow" />
      <SpriteName name={animationName} />
      <Tooltip
        triggerContent={
          <div className="text-lightGrey zx:text-zxWhiteDimmed cursor-help">
            {frames.length}&nbsp;frames
          </div>
        }
        tooltipContent={
          <ul className="max-h-16 block overflow-y-auto">
            {frames.map((f, i) => (
              <li key={`${f}/${i}`}>
                <a
                  href={`#sprite-${sanitiseForClassName(f)}`}
                  className="bitmap-text-link mt-oneScaledPix"
                >
                  <BitmapText>{f}</BitmapText>
                </a>
              </li>
            ))}
          </ul>
        }
      />
      <div className="text-midGrey zx:text-zxWhiteDimmed">
        speed:&nbsp;{frames.animationSpeed}
      </div>
    </div>
  );
};
