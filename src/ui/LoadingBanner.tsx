import { BitmapText } from "../game/components/tailwindSprites/BitmapText";

export const LoadingBanner = ({ children }: { children: string }) => (
  <BitmapText className="animate-flash text-center sprites-double-height block text-midRed zx:text-zxRed toppy:text-toppyPink2 bg-white top-4">
    {children}
  </BitmapText>
);
