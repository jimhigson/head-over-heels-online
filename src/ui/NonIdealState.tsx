import { BitmapText } from "../game/components/tailwindSprites/Sprite";

export const NonIdealState = ({ text }: { text: string }) => (
  <div className="flex flex-col h-full items-center justify-center gap-y-1">
    <span className="sprite texture-animated-dalek" />
    <BitmapText>{text}</BitmapText>
  </div>
);
