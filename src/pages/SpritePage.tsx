import { spritesheetData, type TextureId } from "../sprites/spriteSheetData";
import spritesheetUrl from "../../gfx/sprites.png";
import type { Xy } from "../utils/vectors/vectors";
import { CssVariables } from "../game/components/CssVariables";

declare module "react" {
  interface CSSProperties {
    "--x"?: string | number;
    "--y"?: string | number;
    "--h"?: string | number;
    "--w"?: string | number;
  }
}

const spritePageScale = 4;
const pivotCircleSizePx = 20;

export const SpritePageInner = () => {
  const textureIds = Object.keys(spritesheetData.frames).sort() as TextureId[];
  return (
    <>
      <img
        src={spritesheetUrl}
        className="w-full cursor-crosshair [background:repeating-conic-gradient(#999_0_25%,_#888_0_50%)_50%_/_20px_20px] pixelated"
      />
      <title>Sprites</title>
      <div className="flex flex-wrap p-[8px] bg-pureBlack">
        {textureIds.map((textureId) => {
          const { frame } = spritesheetData.frames[textureId];
          const frameMaybeWithPivot = frame as typeof frame & {
            pivot?: Xy;
          };
          return (
            <div
              key={textureId}
              className="bg-shadow m-[8px] p-[16px] text-center flex flex-col"
            >
              <div
                className={`sprite bg-shadow hover:bg-pink hover:border-white border-shadow border-1 mb-1 box-content mx-auto w-min`}
                // most of these textures won't have classes loaded by tailwind due to ,
                // so inline the relevant info - including how tailwind would inflate
                // the css in prod
                style={{
                  "--x": `${spritesheetData.frames[textureId].frame.x}px`,
                  "--y": `${spritesheetData.frames[textureId].frame.y}px`,
                  "--h": `${spritesheetData.frames[textureId].frame.h}px`,
                  "--w": `${spritesheetData.frames[textureId].frame.w}px`,
                }}
              >
                {frameMaybeWithPivot.pivot ?
                  <div
                    className="border-midRed relative"
                    style={{
                      borderWidth: "2px",
                      borderRadius: "50%",
                      width: `${pivotCircleSizePx}px`,
                      height: `${pivotCircleSizePx}px`,
                      left: `${frameMaybeWithPivot.pivot.x * spritePageScale - pivotCircleSizePx / 2}px`,
                      top: `${frameMaybeWithPivot.pivot.y * spritePageScale - pivotCircleSizePx / 2}px`,
                    }}
                  />
                : null}
              </div>
              {/* take up space to keep the text at the bottom: */}
              <div className="flex-grow" />
              <div className="text-moss">{textureId}</div>
              <div className="text-lightGrey">
                {frame.w}&nbsp;x&nbsp;{frame.h}
              </div>
              <div className="text-midRed">
                {frameMaybeWithPivot.pivot ?
                  <>
                    pivot: ({frameMaybeWithPivot.pivot.x},&nbsp;
                    {frameMaybeWithPivot.pivot.y})
                  </>
                : "no pivot"}
              </div>
              <div className="text-midGrey">
                @({frame.x},&nbsp;{frame.y})
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const SpritePage = () => {
  return (
    <CssVariables scaleFactor={spritePageScale}>
      <SpritePageInner />
    </CssVariables>
  );
};
