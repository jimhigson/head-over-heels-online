import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { Button } from "../../ui/button";
import { DownloadSpritesheetButton } from "./DownloadSpritesheetButton";
import { ScaleSelect } from "./ScaleSelect";
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

export const SpritesPageToolbar = ({
  scale,
  onScaleChange,
  spriteFilter,
  onSpriteFilterChange,
}: SpritesPageToolbarProps) => {
  const spriteOption = useSpritesOption();

  return (
    <div className="sticky top-0 bg-metallicBlueHalfbrite zx:bg-zxWhiteDimmed z-dialog w-max gap-y-oneScaledPix flex flex-col">
      <SpriteOptionSelect />
      <ScaleSelect scale={scale} onScaleChange={onScaleChange} />
      <div className="flex flex-row gap-x-2">
        <div>
          <SpritesheetStats />
        </div>
        <SpriteFilterInput
          spriteFilter={spriteFilter}
          onSpriteFilterChange={onSpriteFilterChange}
        />
      </div>
      <div className="flex flex-row gap-x-1">
        <SpritesheetUrlDisplay />
        <DownloadSpritesheetButton />
        {spriteOption === "Toppy" && <SpritesheetOverrideButtons />}
      </div>

      <Button className="px-1" onClick={() => window.scrollTo({ top: 0 })}>
        <BitmapText>⬆ Top</BitmapText>
      </Button>
    </div>
  );
};
