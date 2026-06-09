import { type ComponentProps } from "react";

import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { cn } from "../cn";
import { useAutoFocus } from "../useAutoFocus";
import { useCommandContext } from "./useCommandContext";

export type CommandInputProps = Omit<
  ComponentProps<"input">,
  "onChange" | "onInput" | "value"
> & {
  autoFocus?: boolean;
};

export const CommandInput = ({
  className,
  autoFocus = false,
  ...props
}: CommandInputProps) => {
  const { search, setSearch } = useCommandContext();
  const ref = useAutoFocus<HTMLInputElement>(autoFocus);
  return (
    <div className="flex items-center border-b px-1 pb-1">
      <span
        className={`sprite mr-1 ${"texture-hud_char_gt" satisfies TextureTailwindClass}`}
      />
      <input
        ref={ref}
        value={search}
        onInput={(e) => setSearch(e.currentTarget.value)}
        className={cn(
          "flex h-1 w-full bg-pastelBlue zx:bg-zxCyan toppy:bg-toppyCool1 py-1 outline-none placeholder:text-shadow zx:placeholder:text-zxBlack toppy:placeholder:text-toppyGrey4 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    </div>
  );
};
