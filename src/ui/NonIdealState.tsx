import { type CSSProperties } from "react";

import { BitmapText } from "../game/components/tailwindSprites/BitmapText";
import { type AnimatedTextureTailwindClass } from "../sprites/spritesheet/spritesheetData/TextureTailwindClass";

type NonIdealStateProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

export const NonIdealState = ({
  text,
  className,
  style,
}: NonIdealStateProps) => (
  <div
    className={`flex flex-col h-full items-center justify-center gap-y-1${className ? ` ${className}` : ""}`}
    style={style}
  >
    <span
      className={`sprite ${"texture-animated-dalek" satisfies AnimatedTextureTailwindClass}`}
    />
    <BitmapText>{text}</BitmapText>
  </div>
);
