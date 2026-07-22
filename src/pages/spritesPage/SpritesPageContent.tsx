import { type AppSpriteFrame } from "../../sprites/spritesheet/spritesheetData/AppSpriteFrame";
import {
  type BaseTextureId,
  type FramesWithSpeed,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { useCurrentSpritesheetData } from "../../store/slices/gameMenus/gameMenusSelectors";
import { entries, keys } from "../../utils/entries";
import { AnimationTile } from "./AnimationTile";
import { FontSpecimen } from "./FontSpecimen";
import { PaletteSwatch } from "./PaletteSwatch";
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
      FramesWithSpeed<BaseTextureId[]>
    >,
  ).sort(([a], [b]) => a.localeCompare(b));

  const textureIds = keys(currentSpritesheetData.frames).sort();
  return (
    <div class="e2e-snapshot-target">
      <PaletteSwatch />
      <FontSpecimen />
      <SpritesheetImage spriteFilter={spriteFilter} />
      <h1
        id="animations"
        class="text-double-height text-metallicBlue zx:text-zxBlue toppy:text-toppyCool3 mt-1"
      >
        Animations
      </h1>
      <div class="flex flex-wrap p-[8px] bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack">
        {animationEntries.map(([animationName, frames]) => (
          <AnimationTile
            key={animationName}
            animationName={animationName}
            frames={frames}
            spritesheetData={currentSpritesheetData}
          />
        ))}
      </div>
      <h1
        id="sprites"
        class="text-double-height text-metallicBlue zx:text-zxBlue toppy:text-toppyCool3 mt-1"
      >
        Sprites
      </h1>
      <div class="flex flex-wrap p-[8px] bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack">
        {textureIds.map((textureId) => {
          const { frame } = currentSpritesheetData.frames[textureId];
          return (
            <SpriteTile
              key={textureId}
              textureId={textureId}
              frame={frame as AppSpriteFrame}
              scale={scale}
            />
          );
        })}
      </div>
    </div>
  );
};
