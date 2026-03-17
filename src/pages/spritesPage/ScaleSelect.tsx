import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { Select } from "../../ui/Select";

const scaleValues = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export type ScaleSelectProps = {
  scale: number;
  onScaleChange: (scale: number) => void;
};

export const ScaleSelect = ({ scale, onScaleChange }: ScaleSelectProps) => (
  <div className="text-white zx:text-zxWhite flex-row flex gap-x-1">
    <BitmapText>Upscale:</BitmapText>
    <Select
      value={`${scale}` as (typeof scaleValues)[number]}
      triggerButtonLabel={<BitmapText className="w-4">{scale}x</BitmapText>}
      values={scaleValues}
      onSelect={(value) => onScaleChange(Number(value))}
      disableCommandInput
    />
  </div>
);
