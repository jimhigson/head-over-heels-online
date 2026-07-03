import { type CSSProperties } from "react";

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
    <span className="text-single-line">{text}</span>
  </div>
);
