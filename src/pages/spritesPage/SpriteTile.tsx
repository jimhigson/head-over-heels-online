import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { type AppSpriteFrame } from "../../sprites/spritesheet/spritesheetData/AppSpriteFrame";
import { type BaseTextureId } from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { spriteSpecificCssVars } from "../../tailwind/plugins/spriteCss";
import { SpriteName } from "./SpriteName";

declare module "preact" {
  // augmenting preact's JSX.CSSProperties requires a namespace here
  // eslint-disable-next-line no-namespace
  namespace JSX {
    interface CSSProperties {
      "--x"?: number | string;
      "--y"?: number | string;
      "--h"?: number | string;
      "--w"?: number | string;
    }
  }
}

const pivotOutlineSizePx = 10;

export type SpriteTileProps = {
  textureId: BaseTextureId;
  frame: AppSpriteFrame;
  scale: number;
};

export const SpriteTile = ({ textureId, frame, scale }: SpriteTileProps) => {
  const spriteOption = useSpritesOption();

  return (
    <div
      key={textureId}
      id={`sprite-${sanitiseForClassName(textureId)}`}
      class="bg-shadow zx:bg-zxRedDimmed toppy:bg-toppyGrey3 m-[4px] p-[8px] text-left flex flex-col w-8 target:bg-white zx:target:bg-zxWhite toppy:target:bg-toppyWarm1 scroll-mt-10"
      data-texture-id={textureId}
    >
      <div
        class={`
        sprite bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack hover:bg-moss zx:hover:bg-zxYellow toppy:hover:bg-toppyWarm3 border-shadow zx:border-zxRedDimmed toppy:border-toppyGrey2
        box-content w-min
        ${spriteOption.uncolourised ? "sprite-revert-to-two-tone" : ""}`}
        // most of these textures won't have classes loaded by tailwind due to ,
        // so inline the relevant info - including how tailwind would inflate
        // the css in prod
        style={spriteSpecificCssVars(
          frame.w,
          frame.h,
          frame.x,
          frame.y,
          frame.flipX,
        )}
      >
        {frame.pivot ?
          <div
            class={`bg-midRed zx:bg-zxRed toppy:bg-toppyPink2 relative`}
            style={{
              width: `${pivotOutlineSizePx}px`,
              height: `${pivotOutlineSizePx}px`,
              left: `${frame.pivot.x * scale - pivotOutlineSizePx / 2}px`,
              top: `${frame.pivot.y * scale - pivotOutlineSizePx / 2}px`,
            }}
          />
        : null}
      </div>
      {/* take up space to keep the text at the bottom: */}
      <div class="flex-grow" />
      <SpriteName name={textureId} />

      <div class="text-lightGrey zx:text-zxWhiteDimmed toppy:text-toppyGrey1">
        {frame.w}&nbsp;x&nbsp;{frame.h}
      </div>

      {frame.pivot ?
        <div class="text-midRed zx:text-zxRed toppy:text-toppyPink2 zx:bg-zxBlack toppy:bg-toppyBlack">
          pivot: ({frame.pivot.x},&nbsp;
          {frame.pivot.y})
        </div>
      : <div class="text-metallicBlue zx:text-zxCyan toppy:text-toppyCool2 zx:bg-zxBlack toppy:bg-toppyBlack">
          no pivot
        </div>
      }
      <div class="text-midGrey zx:text-zxWhiteDimmed toppy:text-toppyGrey2 zx:bg-zxBlack toppy:bg-toppyBlack">
        @({frame.x},&nbsp;{frame.y})
      </div>
    </div>
  );
};
