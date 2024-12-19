import type { TextureId } from "@/sprites/spriteSheet";
import { spriteSheet } from "@/sprites/spriteSheet";
import { ImgSprite } from "../Sprite";

export const SpritePage = () => {
  const textureIds = Object.keys(spriteSheet.textures).sort() as TextureId[];
  return (
    <div className="flex flex-wrap p-4 bg-pureBlack">
      {textureIds.map((textureId) => {
        const { frame } = spriteSheet.data.frames[textureId];
        return (
          <div
            key={textureId}
            className="border-midGrey bg-shadow border border-4 m-1 p-1"
          >
            <ImgSprite
              textureId={textureId}
              scale={5}
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
  );
};
