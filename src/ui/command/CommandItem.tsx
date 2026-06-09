import { type ComponentProps } from "react";

import { cn } from "../cn";
import "./commandColours.css";
import { fuzzyMatch } from "./fuzzyMatch";
import { useCommandContext } from "./useCommandContext";

export type CommandItemProps = Omit<ComponentProps<"div">, "onSelect"> & {
  /** the value used for filtering, keyboard nav and selection */
  value: string;
  onSelect?: (value: string) => void;
};

export const CommandItem = ({
  value,
  onSelect,
  className,
  children,
  ...props
}: CommandItemProps) => {
  const { search, activeValue, setActiveValue } = useCommandContext();

  // self-filter: hide when the value doesn't fuzzy-match the search
  if (search !== "" && fuzzyMatch(value, search) === null) {
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
      className={cn(
        "command-colours relative flex cursor-default select-none items-center text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
