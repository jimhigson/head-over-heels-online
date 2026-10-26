import { Select } from "../../ui/Select";
import { type PixelAspectName, pixelAspectNames } from "./pixelAspectNames";

export type PixelAspectSelectProps = {
  pixelAspect: PixelAspectName;
  onPixelAspectChange: (pixelAspect: PixelAspectName) => void;
};

export const PixelAspectSelect = ({
  pixelAspect,
  onPixelAspectChange,
}: PixelAspectSelectProps) => (
  <div class="text-white zx:text-zxWhite toppy:text-toppyWarm1 flex-row flex gap-x-1">
    <span class="text-single-line">Pixels:</span>
    <Select
      value={pixelAspect}
      triggerButtonLabel={
        <span class="w-6 text-single-line">{pixelAspect}</span>
      }
      values={pixelAspectNames}
      onSelect={onPixelAspectChange}
      disableCommandInput
    />
  </div>
);
