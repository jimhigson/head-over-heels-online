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
  <CommandItem value={value} onSelect={onSelect} className="px-1">
    <span className="text-single-line">{children}</span>
  </CommandItem>
);
