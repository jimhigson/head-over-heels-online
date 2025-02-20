import { useEffect, useState } from "react";
import { load, spriteSheet } from "../../../sprites/spriteSheet";
import {
  spritesheetData,
  type TextureId,
} from "../../../sprites/spriteSheetData";

declare module "react" {
  interface CSSProperties {
    "--x"?: string | number;
    "--y"?: string | number;
    "--h"?: string | number;
    "--w"?: string | number;
  }
}

export const SpritePage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const go = async () => {
      await load();
      setLoaded(true);
    };
    go();
  });

  if (!loaded) {
    return null;
  }

  const textureIds = Object.keys(spriteSheet.textures).sort() as TextureId[];
  return (
    <div className="flex flex-wrap p-[8px] bg-pureBlack">
      <title>Sprites</title>
      {textureIds.map((textureId) => {
        const { frame } = spriteSheet.data.frames[textureId];
        return (
          <div key={textureId} className="bg-shadow m-[8px] p-[16px]">
            <div
              className={`sprite bg-shadow hover:bg-metallicBlue hover:border-pink border-shadow border border-4 mb-1 box-content`}
              // most of these textures won't have classes loaded by tailwid,
              // so inline the relevant info - including by tailwind would inflate
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
              ({frame.x},{frame.y})
            </div>
          </div>
        );
      })}
    </div>
  );
};
