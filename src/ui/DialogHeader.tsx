import type { BitmapTextProps } from "../game/components/tailwindSprites/BitmapText";

import { BitmapText } from "../game/components/tailwindSprites/BitmapText";

export const DialogHeader = (props: BitmapTextProps) => (
  <BitmapText
    className="text-white sprites-double-height bg-midRed text-center py-half px-1"
    {...props}
  />
);
