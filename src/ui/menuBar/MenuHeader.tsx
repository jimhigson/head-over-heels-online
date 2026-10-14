import { MenuItemIconSpace } from "./MenuItemIconSpace";

export type MenuHeaderProps = {
  label: string;
};

/** a heading within a menu, for the items after it - lined up with their labels */
export const MenuHeader = ({ label }: MenuHeaderProps) => (
  <div class="flex items-center gap-1 px-1 py-half bg-metallicBlueHalfbrite">
    <MenuItemIconSpace />
    <span class="text-single-line">{label}</span>
  </div>
);
