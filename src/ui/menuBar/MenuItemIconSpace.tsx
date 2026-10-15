import { type ComponentChildren } from "preact";

export type MenuItemIconSpaceProps = {
  /** the icon, centred in the space - wider ones spill out evenly either side */
  children?: ComponentChildren;
};

/** where a menu item's icon goes, so labels line up whether or not they have one */
export const MenuItemIconSpace = ({ children }: MenuItemIconSpaceProps) => (
  <span class="w-[calc(var(--block)*1.5)] shrink-0 flex items-center justify-center">
    {children}
  </span>
);
