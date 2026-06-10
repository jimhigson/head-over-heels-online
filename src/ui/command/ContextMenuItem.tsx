import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
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
    <BitmapText>{children}</BitmapText>
  </CommandItem>
);
