import type { AriaRole, PropsWithChildren, RefObject } from "react";

import { useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { useIsAssigningKeys } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { setFocussedMenuItemId } from "../../../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../../../store/store";
import { findScrollableAncestor } from "../../../../utils/dom/findScrollableAncestor";
import { useActionTap } from "../useActionTap";
import {
  menuItemDataAttributeDisabled,
  menuItemDataAttributeHidden,
  menuItemDataAttributeId,
} from "./dialogs/menus/menuItemDataAttributes";

/**
 * classnames for the menu item when it is presented as an actual grid-formatted menu
 * - can be left off for the title bar menu, which is inline and just a single item
 */
const presentationalMenuClasses =
  "grid grid-cols-menuItems gap-x-1 gap-y-oneScaledPix " +
  // by default on mobile, the gaps between the items are bigger, and they are further apart - otherwise they
  // are too difficult to hit with a finger
  "mobile:!gap-y-half mobile:sprites-double-height " +
  // h-min not usually needed, but menus shouldn't take up extra space if stretched vertically, ie side-by-side
  // menus on the main menu dialog
  "h-min";

const findMenuItems = () => {
  const menuItemsDom = document.body.querySelectorAll(
    `[${menuItemDataAttributeId}]`,
  );
  return Array.from(menuItemsDom);
};

const findStickyAncestor = (
  /** the element to check */
  element: Element,
  /** stop checking at this ancestor */
  stopAt: Element,
): Element | null => {
  let current = element as Element | null;
  while (current !== null && current !== stopAt) {
    const { position } = window.getComputedStyle(current);
    if (position === "sticky") {
      return current;
    }
    current = current.parentElement;
  }
  return null;
};

const getMenuItemTop = (
  /** the menu item element */
  element: Element,
  /** the scrollable container, if found */
  scrollableAncestor: Element | null,
): number => {
  // we use the first child because menu items have position: content and therefore no
  // bounding box of their own:
  const firstChild = element.firstChild as Element;
  const itemTop = firstChild.getBoundingClientRect().top;

  const scrollableElement = scrollableAncestor ?? document.documentElement;
  const stickyAncestor = findStickyAncestor(element, scrollableElement);

  // consider sticky items to be at the top of the scrollable ancestor:
  if (stickyAncestor !== null) {
    // if sticky, consider it to be at the top of the scrollable ancestor
    return (
      ((
        scrollableAncestor?.firstChild as Element | undefined
      )?.getBoundingClientRect().top ?? 0) -
      firstChild.getBoundingClientRect().height
    );
  }

  return itemTop;
};

/** @returns true iff declined to handle */
const moveFocus = (
  /** direction to move: -1 for up/backwards, 1 for down/forwards */
  direction: -1 | 1,
  /** how far to move */
  by: "all" | "page" | "single",
) => {
  const {
    gameMenus: {
      openMenus: [{ focussedItemId: curFocusId }],
    },
  } = store.getState();

  if (curFocusId === undefined) {
    return true; // nothing is selected yet, so can't move the selection up
  }

  const menuItemsDom = findMenuItems();

  if (menuItemsDom.length <= 1) {
    return true; // no menu items to select, or just one item so no movement possible
  }

  const curFocusIndex = menuItemsDom.findIndex(
    (miDom) => miDom.getAttribute(menuItemDataAttributeId) === curFocusId,
  );

  if (curFocusIndex === -1) {
    return true; // whatever is focussed isn't in virtual dom any more - not sure if this is possible
  }

  let newFocusIndex = curFocusIndex;

  const currentElement = menuItemsDom[curFocusIndex];
  const scrollableAncestor = findScrollableAncestor(currentElement);

  switch (by) {
    case "all": {
      // move to first or last item
      newFocusIndex = direction === -1 ? 0 : menuItemsDom.length - 1;

      // skip hidden/disabled items
      while (
        menuItemsDom[newFocusIndex].getAttribute(
          menuItemDataAttributeHidden,
        ) === "true" ||
        menuItemsDom[newFocusIndex].getAttribute(
          menuItemDataAttributeDisabled,
        ) === "true"
      ) {
        newFocusIndex += direction;
        if (newFocusIndex < 0 || newFocusIndex >= menuItemsDom.length) {
          return true; // no valid items in this direction
        }
      }
      break;
    }

    case "page": {
      // move by approximately one screen height

      const currentTop = getMenuItemTop(currentElement, scrollableAncestor);
      const viewportHeight =
        scrollableAncestor?.clientHeight ?? window.innerHeight;
      const targetTop = currentTop + direction * viewportHeight;

      let closestIndex = curFocusIndex;
      let closestDistance = Infinity;

      for (let i = 0; i < menuItemsDom.length; i++) {
        if (i === curFocusIndex) continue;
        const element = menuItemsDom[i];
        if (
          element.getAttribute(menuItemDataAttributeHidden) === "true" ||
          element.getAttribute(menuItemDataAttributeDisabled) === "true"
        ) {
          continue;
        }

        const elementTop = getMenuItemTop(element, scrollableAncestor);
        const distance = Math.abs(elementTop - targetTop);

        // only consider items in the correct direction
        if (
          (direction === -1 && elementTop < currentTop) ||
          (direction === 1 && elementTop > currentTop)
        ) {
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        }
      }

      newFocusIndex = closestIndex;
      break;
    }

    case "single": {
      // move one item at a time with wraparound
      do {
        newFocusIndex =
          (newFocusIndex + direction + menuItemsDom.length) %
          menuItemsDom.length;
      } while (
        menuItemsDom[newFocusIndex].getAttribute(
          menuItemDataAttributeHidden,
        ) === "true" ||
        menuItemsDom[newFocusIndex].getAttribute(
          menuItemDataAttributeDisabled,
        ) === "true"
      );
      break;
    }

    default:
      by satisfies never;
  }

  if (newFocusIndex === curFocusIndex) {
    return true; // couldn't move anywhere
  }

  const newFocussedElement = menuItemsDom[newFocusIndex];
  if (scrollableAncestor !== findScrollableAncestor(newFocussedElement)) {
    // scrollable ancestor changed - scroll the old one to the top.
    // Ie, focus moved from a scrollable menu item to the sticky
    // dialog header at the top of the page
    scrollableAncestor?.scrollTo({ top: 0, behavior: "smooth" });
  }

  store.dispatch(
    setFocussedMenuItemId({
      focussedItemId: menuItemsDom[newFocusIndex].getAttribute(
        menuItemDataAttributeId,
      )!,
      scrollableSelection: true,
    }),
  );

  return false;
};

const useMenuNavigationInput = (
  containerRef: RefObject<HTMLMenuElement | null>,
) => {
  const disabled = useIsAssigningKeys();

  useActionTap({
    action: "away",
    handler: useCallback(() => {
      if (containerRef.current === null) return;

      return moveFocus(-1, "single");
    }, [containerRef]),
    disabled,
  });

  useActionTap({
    action: "towards",
    handler: useCallback(() => {
      if (containerRef.current === null) return;

      return moveFocus(1, "single");
    }, [containerRef]),
    disabled,
  });

  useActionTap({
    action: "pageUp",
    handler: useCallback(() => {
      if (containerRef.current === null) return;

      return moveFocus(-1, "page");
    }, [containerRef]),
    disabled,
  });

  useActionTap({
    action: "pageDown",
    handler: useCallback(() => {
      if (containerRef.current === null) return;

      return moveFocus(1, "page");
    }, [containerRef]),
    disabled,
  });

  useActionTap({
    action: "home",
    handler: useCallback(() => {
      if (containerRef.current === null) return;

      return moveFocus(-1, "all");
    }, [containerRef]),
    disabled,
  });

  useActionTap({
    action: "end",
    handler: useCallback(() => {
      if (containerRef.current === null) return;

      return moveFocus(1, "all");
    }, [containerRef]),
    disabled,
  });
};

type MenuItemsProps = PropsWithChildren<{
  className?: string;
  inline?: boolean;
  role?: AriaRole;
}>;

export const MenuItems = ({
  className = "",
  children,
  inline = false,
  role = undefined,
}: MenuItemsProps) => {
  const ref = useRef<HTMLMenuElement>(null);

  // on mount, find the first menu item and set it to selected in the store
  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    if (store.getState().gameMenus.openMenus[0].focussedItemId !== undefined) {
      // have already a selection, no need to select the first item
      return;
    }

    const menuItemsDom = findMenuItems();

    const firstMenuItemDom = menuItemsDom.at(0);

    if (firstMenuItemDom === undefined) {
      const {
        openMenus: [{ menuId }],
      } = store.getState().gameMenus;
      // this should never happen - if we ever need <MenuItems> with no items on the page
      // to not throw, we can replace this with a console.warn instead
      throw new Error(
        `<MenuItems> component mounted with no menu items on the page in store current top menu is "${menuId}"`,
      );
    }

    const firstMenuItemId = firstMenuItemDom.getAttribute(
      menuItemDataAttributeId,
    );

    const initialFocussedMenuId =
      // don't initially focus the back button - go to the 2nd item (unless there's only back)
      firstMenuItemId === "back" && menuItemsDom.length > 1 ?
        menuItemsDom[1].getAttribute(menuItemDataAttributeId)
      : firstMenuItemId;

    store.dispatch(
      setFocussedMenuItemId({
        focussedItemId: initialFocussedMenuId!,
        scrollableSelection: true,
      }),
    );
  }, []);

  useMenuNavigationInput(ref);

  return (
    <menu
      ref={ref}
      role={role}
      className={twMerge(inline ? "" : presentationalMenuClasses, className)}
    >
      {children}
    </menu>
  );
};
