import { useState } from "preact/hooks";

import { useSpritesheetName } from "../../store/slices/gameMenus/gameMenusSelectors";
import { Button } from "../../ui/Button";
import { DownloadSpritesheetButton } from "./DownloadSpritesheetButton";
import { type PixelAspectName } from "./pixelAspectNames";
import { PixelAspectSelect } from "./PixelAspectSelect";
import { ScaleSelect } from "./ScaleSelect";
import { SpriteFilterInput } from "./SpriteFilterInput";
import { SpritesheetArtUrlDisplay } from "./SpritesheetArtUrlDisplay";
import { SpritesheetOverrideButtons } from "./SpritesheetOverrideButtons";
import { SpritesheetSelect } from "./SpritesheetSelect";
import { SpritesheetStats } from "./SpritesheetStats";
import { UpscaledSpritesSwitch } from "./UpscaledSpritesSwitch";

export type SpritesPageToolbarProps = {
  scale: number;
  onScaleChange: (scale: number) => void;
  spriteFilter: string;
  onSpriteFilterChange: (filter: string) => void;
  pixelAspect: PixelAspectName;
  onPixelAspectChange: (pixelAspect: PixelAspectName) => void;
};

export const SpritesPageToolbar = ({
  scale,
  onScaleChange,
  spriteFilter,
  onSpriteFilterChange,
  pixelAspect,
  onPixelAspectChange,
}: SpritesPageToolbarProps) => {
  const spritesheetName = useSpritesheetName();
  const [shown, setShown] = useState(true);

  return (
    <div class="fixed top-0 left-0 z-dialog w-max">
      {shown ?
        <div class="bg-metallicBlueHalfbrite zx:bg-zxWhiteDimmed toppy:bg-toppyCool4 gap-y-oneScaledPix flex flex-col">
          <div class="flex flex-row gap-x-1">
            <SpritesheetSelect />
            <Button class="px-1" onClick={() => setShown(false)}>
              <span class="text-single-line">hide</span>
            </Button>
          </div>
          <ScaleSelect scale={scale} onScaleChange={onScaleChange} />
          <PixelAspectSelect
            pixelAspect={pixelAspect}
            onPixelAspectChange={onPixelAspectChange}
          />
          <UpscaledSpritesSwitch />
          <div class="flex flex-row gap-x-2">
            <div>
              <SpritesheetStats />
            </div>
            <SpriteFilterInput
              spriteFilter={spriteFilter}
              onSpriteFilterChange={onSpriteFilterChange}
            />
          </div>
          <div class="flex flex-row gap-x-1">
            <SpritesheetArtUrlDisplay />
            <DownloadSpritesheetButton />
            {spritesheetName === "toppy" && <SpritesheetOverrideButtons />}
          </div>

          <Button class="px-1" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="text-single-line">⬆ Top</span>
          </Button>
        </div>
      : <Button class="px-1" onClick={() => setShown(true)}>
          <span class="text-single-line">☰ tools</span>
        </Button>
      }
    </div>
  );
};
