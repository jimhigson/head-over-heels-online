import type {
  FramesWithSpeed,
  TextureId,
} from "../../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { Xy } from "../../utils/vectors/vectors";

import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useCurrentSpritesheetData } from "../../store/slices/gameMenus/gameMenusSelectors";
import { entries } from "../../utils/entries";
import { AnimationTile } from "./AnimationTile";
import { SpritesheetImage } from "./SpritesheetImage";
import { SpriteTile } from "./SpriteTile";

export type SpritesPageContentProps = { scale: number; spriteFilter: string };

export const SpritesPageContent = ({
  scale,
  spriteFilter,
}: SpritesPageContentProps) => {
  const currentSpritesheetData = useCurrentSpritesheetData();

  const animationEntries = entries(
    currentSpritesheetData.animations as Record<
      string,
      FramesWithSpeed<TextureId[]>
    >,
  ).sort(([a], [b]) => a.localeCompare(b));

  const textureIds = Object.keys(
    currentSpritesheetData.frames,
  ).sort() as TextureId[];
  return (
    <div className="e2e-snapshot-target">
      <SpritesheetImage spriteFilter={spriteFilter} />
      <BitmapText
        id="animations"
        className="sprites-double-height text-metallicBlue zx:text-zxBlue mt-1"
        TagName="h1"
      >
        Animations
      </BitmapText>
      <div className="flex flex-wrap p-[8px] bg-pureBlack zx:bg-zxBlack">
        {animationEntries.map(([animationName, frames]) => (
          <AnimationTile
            key={animationName}
            animationName={animationName}
            frames={frames}
            spritesheetData={currentSpritesheetData}
          />
        ))}
      </div>
      <BitmapText
        id="sprites"
        className="sprites-double-height text-metallicBlue zx:text-zxBlue mt-1"
        TagName="h1"
      >
        Sprites
      </BitmapText>
      <div className="flex flex-wrap p-[8px] bg-pureBlack zx:bg-zxBlack">
        {textureIds.map((textureId) => {
          const { frame } = currentSpritesheetData.frames[textureId];
          const frameMaybeWithPivot = frame as typeof frame & {
            pivot?: Xy;
          };
          return (
            <SpriteTile
              key={textureId}
              textureId={textureId}
              frame={frameMaybeWithPivot}
              scale={scale}
            />
          );
        })}
      </div>
    </div>
  );
};
