import { type CSSProperties } from "preact/compat";

import { type AnimatedTextureTailwindClass } from "../sprites/spritesheet/spritesheetData/TextureTailwindClass";

type NonIdealStateProps = {
  text: string;
  class?: string;
  style?: CSSProperties;
};

export const NonIdealState = ({
  text,
  class: className,
  style,
}: NonIdealStateProps) => (
  <div
    class={`flex flex-col h-full items-center justify-center gap-y-1${className ? ` ${className}` : ""}`}
    style={style}
  >
    <span
      class={`sprite ${"texture-animated-dalek" satisfies AnimatedTextureTailwindClass}`}
    />
    <span class="text-single-line">{text}</span>
  </div>
);
