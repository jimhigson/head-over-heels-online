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
            className="border-metallicBlue bg-shadow border border-4 m-1"
          >
            <ImgSprite
              textureId={textureId}
              scale={5}
              className="bg-shadow hover:bg-metallicBlue hover:border-pink border-shadow border border-4 m-1 box-content"
            />
            <div className="text-lightGrey ml-1">{textureId}</div>
            <div className="text-midGrey ml-1 mb-1">
              ({frame.w}&nbsp;x&nbsp;{frame.h})
            </div>
          </div>
        );
      })}
    </div>
  );
};
