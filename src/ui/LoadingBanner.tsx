import { BitmapText } from "../game/components/tailwindSprites/Sprite";

export const LoadingBanner = ({ children }: { children: string }) => (
  <BitmapText className="animate-flash text-center sprites-double-height block text-midRed zx:text-zxRed bg-white top-4">
    {children}
  </BitmapText>
);
