import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { type ComponentProps, type KeyboardEvent } from "react";

import { cn } from "../cn";
import { CommandContext } from "./commandContext";

export type CommandProps = Omit<ComponentProps<"div">, "onSelect"> & {
  /** called when Escape is pressed */
  onClose?: () => void;
  /** the item value to highlight when first opened */
  defaultValue?: string;
  /** controlled filter text (omit to let the Command manage its own) */
  search?: string;
  onSearchChange?: (search: string) => void;
};

/**
 * A filterable, keyboard-navigable list. Items are composed as children
 * (`CommandItem`); each filters itself out when it doesn't match the search.
 * The visible items are read from the DOM, so no item registry is needed.
 */
export const Command = ({
  className,
  onClose,
  defaultValue,
  search: controlledSearch,
  onSearchChange,
  onKeyDown,
  children,
  ...props
}: CommandProps) => {
  const [internalSearch, setInternalSearch] = useState("");
  const search = controlledSearch ?? internalSearch;
  const [activeValue, setActiveValue] = useState<string | undefined>(
    defaultValue,
  );
  const [resultCount, setResultCount] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);

  const setSearch = (next: string) => {
    if (controlledSearch === undefined) {
      setInternalSearch(next);
    }
    onSearchChange?.(next);
  };

  const visibleItems = () => [
    ...(listRef.current?.querySelectorAll<HTMLElement>("[data-command-item]") ??
      []),
  ];

  // keep the result count and the highlighted item in step with what is
  // actually visible after filtering. The filter is driven by `search`, so
  // recompute whenever it (or the active item) changes; the setStates bail out
  // when unchanged, so this can't loop.
  useLayoutEffect(() => {
    const items = [
      ...(listRef.current?.querySelectorAll<HTMLElement>(
        "[data-command-item]",
      ) ?? []),
    ];
    setResultCount(items.length);
    const values = items.map((item) => item.dataset.value);
    if (activeValue === undefined || !values.includes(activeValue)) {
      setActiveValue(values[0]);
    }
  }, [search, activeValue]);

  // scroll the highlighted item into view *after* commit, so the DOM already
  // reflects the new selection (avoids the highlight landing off-screen)
  useEffect(() => {
    if (activeValue === undefined) {
      return;
    }
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-command-item][data-value="${CSS.escape(activeValue)}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeValue]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.key === "Escape") {
      onClose?.();
      return;
    }
    const items = visibleItems();
    if (items.length === 0) {
      return;
    }
    const index = items.findIndex((item) => item.dataset.value === activeValue);
    const moveTo = (item: HTMLElement | undefined) => {
      if (item !== undefined) {
        e.preventDefault();
        setActiveValue(item.dataset.value);
      }
    };
    switch (e.key) {
      case "ArrowDown":
        moveTo(items[index + 1] ?? items[0]);
        break;
      case "ArrowUp":
        moveTo(items[index - 1] ?? items[items.length - 1]);
        break;
      case "Home":
        moveTo(items[0]);
        break;
      case "End":
        moveTo(items[items.length - 1]);
        break;
      case "Enter":
        e.preventDefault();
        items[index]?.click();
        break;
    }
  };

  return (
    <CommandContext.Provider
      value={{
        search,
        setSearch,
        activeValue,
        setActiveValue,
        resultCount,
        listRef,
      }}
    >
      <div
        className={cn(
          "flex h-full w-full flex-col overflow-hidden bg-metallicBlue zx:bg-zxBlue toppy:bg-toppyCool3 text-popover-foreground",
          className,
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
};
