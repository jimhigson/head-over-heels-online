import { spritesheetData, type TextureId } from "../sprites/spriteSheetData";
import spritesheetUrl from "../../gfx/sprites.png";

declare module "react" {
  interface CSSProperties {
    "--x"?: string | number;
    "--y"?: string | number;
    "--h"?: string | number;
    "--w"?: string | number;
  }
}

export const SpritePage = () => {
  const textureIds = Object.keys(spritesheetData.frames).sort() as TextureId[];
  return (
    <>
      <img src={spritesheetUrl} className="w-full bg-replaceLight" />
      <title>Sprites</title>
      <div className="flex flex-wrap p-[8px] bg-pureBlack">
        {textureIds.map((textureId) => {
          const { frame } = spritesheetData.frames[textureId];
          return (
            <div
              key={textureId}
              className="bg-shadow m-[8px] p-[16px] text-center"
            >
              <div
                className={`sprite bg-shadow hover:bg-pink hover:border-white border-shadow border-2 mb-1 box-content mx-auto w-min`}
                // most of these textures won't have classes loaded by tailwind due to ,
                // so inline the relevant info - including how tailwind would inflate
                // the css in prod
                style={{
                  "--x": `${spritesheetData.frames[textureId].frame.x}px`,
                  "--y": `${spritesheetData.frames[textureId].frame.y}px`,
                  "--h": `${spritesheetData.frames[textureId].frame.h}px`,
                  "--w": `${spritesheetData.frames[textureId].frame.w}px`,
                }}
              />
              <div className="text-moss">{textureId}</div>
              <div className="text-lightGrey">
                {frame.w}&nbsp;x&nbsp;{frame.h}
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
