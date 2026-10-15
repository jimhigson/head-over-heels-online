import { toChildArray } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useRef, useState } from "preact/hooks";

import { cn } from "../cn";
import { MenuBarContext } from "./MenuBarContext";

export type MenuBarProps = PropsWithChildren<{
  class?: string;
}>;

/**
 * a desktop-style menu bar of `Menu`s, each a name dropping down its items.
 * Once one menu is open, hovering another name switches to it, and the left
 * and right arrow keys move between menus. Choosing an item closes the menu
 */
export const MenuBar = ({ children, class: className }: MenuBarProps) => {
  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined);
  const openIndexAtPointerDownRef = useRef<number | undefined>(undefined);
  const menus = toChildArray(children);

  return (
    <div role="menubar" class={cn("flex", className)}>
      {menus.map((menu, index) => (
        <MenuBarContext
          key={index}
          value={{
            index,
            menuCount: menus.length,
            openIndex,
            setOpenIndex,
            openIndexAtPointerDownRef,
          }}
        >
          {menu}
        </MenuBarContext>
      ))}
    </div>
  );
};
