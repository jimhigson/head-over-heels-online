import type { TextureId } from "@/sprites/spriteSheet";
import { spriteSheet } from "@/sprites/spriteSheet";
import { ImgSprite } from "../Sprite";
import { CssVariables } from "../CssVariables";

export const SpritePage = () => {
  const textureIds = Object.keys(spriteSheet.textures).sort() as TextureId[];
  return (
    <CssVariables>
      <div className="flex flex-wrap p-[8px] bg-pureBlack">
        {textureIds.map((textureId) => {
          const { frame } = spriteSheet.data.frames[textureId];
          return (
            <div key={textureId} className="bg-shadow m-[8px] p-[16px]">
              <ImgSprite
                textureId={textureId}
                className="bg-shadow hover:bg-metallicBlue hover:border-pink border-shadow border border-4 mb-1 box-content"
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
    </CssVariables>
  );
};
