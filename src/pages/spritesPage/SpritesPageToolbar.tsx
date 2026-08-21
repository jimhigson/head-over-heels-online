import { useState } from "preact/hooks";

import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { Button } from "../../ui/Button";
import { DownloadSpritesheetButton } from "./DownloadSpritesheetButton";
import { ScaleSelect } from "./ScaleSelect";
import { SmoothSpritesSwitch } from "./SmoothSpritesSwitch";
import { SpriteFilterInput } from "./SpriteFilterInput";
import { SpriteOptionSelect } from "./SpriteOptionSelect";
import { SpritesheetOverrideButtons } from "./SpritesheetOverrideButtons";
import { SpritesheetStats } from "./SpritesheetStats";
import { SpritesheetUrlDisplay } from "./SpritesheetUrlDisplay";

export type SpritesPageToolbarProps = {
  scale: number;
  onScaleChange: (scale: number) => void;
  spriteFilter: string;
  onSpriteFilterChange: (filter: string) => void;
};

/**
 * The page's controls, held against the top of the window rather than the top
 * of the document, so they stay reachable however far down the sheet has been
 * scrolled. They cover the sprites underneath them, so they fold away to a
 * single button for looking at whatever they were sitting on.
 */
export const SpritesPageToolbar = ({
  scale,
  onScaleChange,
  spriteFilter,
  onSpriteFilterChange,
}: SpritesPageToolbarProps) => {
  const spriteOption = useSpritesOption();
  const [shown, setShown] = useState(true);

  return (
    <div class="fixed top-0 left-0 z-dialog w-max">
      {shown ?
        <div class="bg-metallicBlueHalfbrite zx:bg-zxWhiteDimmed toppy:bg-toppyCool4 gap-y-oneScaledPix flex flex-col">
          <div class="flex flex-row gap-x-1">
            <SpriteOptionSelect />
            <Button class="px-1" onClick={() => setShown(false)}>
              <span class="text-single-line">hide</span>
            </Button>
          </div>
          <ScaleSelect scale={scale} onScaleChange={onScaleChange} />
          <SmoothSpritesSwitch />
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
            <SpritesheetUrlDisplay />
            <DownloadSpritesheetButton />
            {spriteOption.name === "Toppy" && <SpritesheetOverrideButtons />}
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
