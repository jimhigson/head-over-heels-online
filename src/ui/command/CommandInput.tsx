import { type ComponentProps } from "preact";

import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { cn } from "../cn";
import { useAutoFocus } from "../useAutoFocus";
import { useCommandContext } from "./useCommandContext";

export type CommandInputProps = Omit<
  ComponentProps<"input">,
  // type/role/list are discriminants of preact's input attribute union; omitting
  // them lets the explicit type="text" below select the textbox variant cleanly.
  // className is omitted so callers must use `class` — a spread className would
  // silently clobber the merged class attribute
  "className" | "list" | "onChange" | "onInput" | "role" | "type" | "value"
> & {
  autoFocus?: boolean;
};

export const CommandInput = ({
  class: className,
  autoFocus = false,
  ...props
}: CommandInputProps) => {
  const { search, setSearch } = useCommandContext();
  const ref = useAutoFocus<HTMLInputElement>(autoFocus);
  return (
    <div class="flex items-center border-b px-1 pb-1">
      <span
        class={`sprite mr-1 ${"texture-hud_char_gt" satisfies TextureTailwindClass}`}
      />
      <input
        ref={ref}
        value={search}
        onInput={(e) => setSearch(e.currentTarget.value)}
        class={cn(
          "flex h-1 w-full bg-pastelBlue zx:bg-zxCyan toppy:bg-toppyCool1 py-1 outline-none placeholder:text-shadow zx:placeholder:text-zxBlack toppy:placeholder:text-toppyGrey4 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
        type="text"
      />
    </div>
  );
};
