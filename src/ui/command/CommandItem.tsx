import { type ComponentProps } from "preact";
import { type CSSProperties } from "preact/compat";

import { cn } from "../cn";
import "./commandColours.css";
import { fuzzyMatchRank } from "./fuzzyMatch";
import { useCommandContext } from "./useCommandContext";

export type CommandItemProps = Omit<
  ComponentProps<"div">,
  "className" | "onSelect" | "style"
> & {
  style?: CSSProperties;
  /** the value used for filtering, keyboard nav and selection */
  value: string;
  onSelect?: (value: string) => void;
};

export const CommandItem = ({
  value,
  onSelect,
  class: className,
  style,
  children,
  ...props
}: CommandItemProps) => {
  const { search, activeValue, setActiveValue } = useCommandContext();

  const rank = search === "" ? 0 : fuzzyMatchRank(value, search);
  // self-filter: hide when the value doesn't fuzzy-match the search
  if (rank === null) {
    return null;
  }

  const selected = value === activeValue;

  return (
    <div
      data-command-item=""
      data-value={value}
      data-selected={selected ? "true" : "false"}
      role="option"
      aria-selected={selected}
      onClick={() => onSelect?.(value)}
      onPointerMove={() => {
        if (!selected) {
          setActiveValue(value);
        }
      }}
      class={cn(
        "command-colours relative flex cursor-default select-none items-center outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      // the list lays items out best match first:
      style={{ ...style, order: rank }}
      {...props}
    >
      {children}
    </div>
  );
};
