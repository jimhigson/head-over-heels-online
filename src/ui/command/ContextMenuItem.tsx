import { CommandItem } from "./CommandItem";

export type ContextMenuItemProps = {
  value: string;
  onSelect?: () => void;
  children: string;
};

export const ContextMenuItem = ({
  value,
  onSelect,
  children,
}: ContextMenuItemProps) => (
  <CommandItem value={value} onSelect={onSelect} class="px-1">
    <span class="text-single-line">{children}</span>
  </CommandItem>
);
