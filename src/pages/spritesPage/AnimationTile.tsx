import { useEffect, useRef } from "preact/hooks";

import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { keyframesToCss } from "../../sprites/css/keyframesToCss";
import {
  animatedSpriteSpecificCssVars,
  animationIsUniformlyFlipped,
  keyframesForAnimatedSprite,
} from "../../sprites/css/spriteCss";
import { type AppSpritesheetData } from "../../sprites/spritesheet/AppSpritesheet";
import {
  type BaseTextureId,
  type FramesWithSpeed,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { useTip } from "../../ui/tip/useTip";
import { SpriteName } from "./SpriteName";

export type AnimationTileProps = {
  animationName: string;
  frames: FramesWithSpeed<BaseTextureId[]>;
  spritesheetData: AppSpritesheetData;
};

export const AnimationTile = ({
  animationName,
  frames,
  spritesheetData,
}: AnimationTileProps) => {
  const styleRef = useRef<HTMLStyleElement>(null);
  const spriteOption = useSpritesOption();

  const { interestfor, tip } = useTip(
    <ul class="max-h-16 block overflow-y-auto">
      {frames.map((f, i) => (
        <li key={`${f}/${i}`}>
          <a
            href={`#sprite-${sanitiseForClassName(f)}`}
            class="bitmap-text-link mt-oneScaledPix"
          >
            <span class="text-single-line">{f}</span>
          </a>
        </li>
      ))}
    </ul>,
  );

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
      class="bg-shadow zx:bg-zxRedDimmed toppy:bg-toppyGrey3 m-[4px] p-[8px] text-left flex flex-col w-8"
      data-animation-id={animationName}
    >
      <style ref={styleRef} />
      {missingFrameIds.length > 0 ?
        <div class="text-midRed zx:text-zxRed toppy:text-toppyPink2">
          missingFrame: {missingFrameIds[0]}
        </div>
      : <div
          class={`sprite bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack hover:bg-moss zx:hover:bg-zxYellow toppy:hover:bg-toppyWarm3 border-shadow zx:border-zxRedDimmed toppy:border-toppyGrey2 box-content w-min
          ${animationIsUniformlyFlipped(frames, spritesheetData) ? "sprite-flip-x" : ""}
          ${spriteOption.uncolourised ? "sprite-revert-to-two-tone" : ""}`}
          style={animatedSpriteSpecificCssVars(
            animationName,
            sanitiseForClassName,
            frames,
            spritesheetData,
          )}
        />
      }
      <div class="flex-grow" />
      <SpriteName name={animationName} />
      <button
        type="button"
        interestfor={interestfor}
        class="text-lightGrey zx:text-zxWhiteDimmed toppy:text-toppyGrey1 cursor-help text-left"
      >
        {frames.length}&nbsp;frames
      </button>
      {tip}
      <div class="text-midGrey zx:text-zxWhiteDimmed toppy:text-toppyGrey2">
        speed:&nbsp;{frames.animationSpeed}
      </div>
    </div>
  );
};
