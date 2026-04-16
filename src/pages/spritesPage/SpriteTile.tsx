import "react";

import type { TextureId } from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import type { Xy } from "../../utils/vectors/vectors";

import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { spriteSpecificCssVars } from "../../tailwind/plugins/spriteCss";

declare module "react" {
  interface CSSProperties {
    "--x"?: number | string;
    "--y"?: number | string;
    "--h"?: number | string;
    "--w"?: number | string;
  }
}
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { SpriteName } from "./SpriteName";

const pivotOutlineSizePx = 10;

export type SpriteTileProps = {
  textureId: TextureId;
  frame: { x: number; y: number; w: number; h: number; pivot?: Xy };
  scale: number;
};

export const SpriteTile = ({ textureId, frame, scale }: SpriteTileProps) => {
  const spriteOption = useSpritesOption();

  return (
    <div
      key={textureId}
      id={`sprite-${sanitiseForClassName(textureId)}`}
      className="bg-shadow zx:bg-zxRedDimmed m-[4px] p-[8px] text-left flex flex-col w-8 target:bg-white zx:target:bg-zxWhite scroll-mt-10"
      data-texture-id={textureId}
    >
      <div
        className={`
        sprite bg-pureBlack zx:bg-zxBlack hover:bg-moss zx:hover:bg-zxYellow border-shadow zx:border-zxRedDimmed
        box-content w-min
        ${spriteOption.uncolourised ? "sprite-revert-to-two-tone" : ""}`}
        // most of these textures won't have classes loaded by tailwind due to ,
        // so inline the relevant info - including how tailwind would inflate
        // the css in prod
        style={spriteSpecificCssVars(frame.w, frame.h, frame.x, frame.y)}
      >
        {frame.pivot ?
          <div
            className={`bg-midRed zx:bg-zxRed relative`}
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
      <div className="flex-grow" />
      <SpriteName name={textureId} />

      <div className="text-lightGrey zx:text-zxWhiteDimmed">
        {frame.w}&nbsp;x&nbsp;{frame.h}
      </div>

      {frame.pivot ?
        <div className="text-midRed zx:text-zxRed zx:bg-zxBlack">
          pivot: ({frame.pivot.x},&nbsp;
          {frame.pivot.y})
        </div>
      : <div className="text-metallicBlue zx:text-zxCyan zx:bg-zxBlack">
          no pivot
        </div>
      }
      <div className="text-midGrey zx:text-zxWhiteDimmed zx:bg-zxBlack">
        @({frame.x},&nbsp;{frame.y})
      </div>
    </div>
  );
};
