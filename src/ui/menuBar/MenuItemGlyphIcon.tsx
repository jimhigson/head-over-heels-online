import { cn } from "../cn";

export type MenuItemGlyphIconProps = {
  glyph: string;
  /** eg the background colour */
  class?: string;
};

/** a menu item icon made of one character, sized like a sprite icon */
export const MenuItemGlyphIcon = ({
  glyph,
  class: className,
}: MenuItemGlyphIconProps) => (
  <span
    class={cn(
      "w-[calc(var(--block)*1.5)] h-[calc(var(--block)*1.5)] shrink-0 flex items-center justify-center text-white text-single-line group-data-[disabled=true]:opacity-50",
      className,
    )}
  >
    {glyph}
  </span>
);
