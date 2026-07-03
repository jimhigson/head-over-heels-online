import { Select } from "../../ui/Select";

const scaleValues = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export type ScaleSelectProps = {
  scale: number;
  onScaleChange: (scale: number) => void;
};

export const ScaleSelect = ({ scale, onScaleChange }: ScaleSelectProps) => (
  <div class="text-white zx:text-zxWhite toppy:text-toppyWarm1 flex-row flex gap-x-1">
    <span class="text-single-line">Upscale:</span>
    <Select
      value={`${scale}` as (typeof scaleValues)[number]}
      triggerButtonLabel={<span class="w-4 text-single-line">{scale}x</span>}
      values={scaleValues}
      onSelect={(value) => onScaleChange(Number(value))}
      disableCommandInput
    />
  </div>
);
