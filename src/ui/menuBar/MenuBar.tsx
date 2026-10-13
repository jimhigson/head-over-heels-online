import { isValidElement, toChildArray } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useRef, useState } from "preact/hooks";

import { cn } from "../cn";
import { Menu } from "./Menu";
import { MenuBarContext } from "./MenuBarContext";

export type MenuBarProps = PropsWithChildren<{
  class?: string;
}>;

/**
 * a desktop-style menu bar of `Menu`s, each a name dropping down its items,
 * laid out in a row with anything else given between them (eg a
 * `MenuBarTitle`). Once one menu is open, hovering another name switches to
 * it, and the left and right arrow keys move between menus. Choosing an item
 * closes the menu
 */
export const MenuBar = ({ children, class: className }: MenuBarProps) => {
  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined);
  const openIndexAtPointerDownRef = useRef<number | undefined>(undefined);
  const barChildren = toChildArray(children);
  const isMenu = (child: (typeof barChildren)[number]) =>
    isValidElement(child) && child.type === Menu;
  const menuCount = barChildren.filter(isMenu).length;

  // only the menus are numbered, so the arrow keys skip anything between them:
  let menuIndex = 0;
  return (
    <div role="menubar" class={cn("flex", className)}>
      {barChildren.map((barChild, childIndex) =>
        isMenu(barChild) ?
          <MenuBarContext
            key={childIndex}
            value={{
              index: menuIndex++,
              menuCount,
              openIndex,
              setOpenIndex,
              openIndexAtPointerDownRef,
            }}
          >
            {barChild}
          </MenuBarContext>
        : barChild,
      )}
    </div>
  );
};
