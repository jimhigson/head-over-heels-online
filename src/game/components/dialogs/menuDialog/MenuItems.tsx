import { twMerge } from "tailwind-merge";
import { useIsAssigningKeys } from "../../../../store/selectors";
import { useActionTap } from "../useActionTap";
import type { PropsWithChildren, RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";
import { store } from "../../../../store/store";
import {
  menuItemDataAttributeId,
  menuItemDataAttributeHidden,
} from "./MenuItem";
import { setFocussedMenuItemId } from "../../../../store/gameMenusSlice";

const findMenuItems = () => {
  const menuItemsDom = document.body.querySelectorAll(
    `[${menuItemDataAttributeId}]`,
  );
  return Array.from(menuItemsDom);
};

/** @returns true iff declined to handle */
const moveFocus = (direction: 1 | -1) => {
  const curFocusId = store.getState().openMenus[0].focussedItemId;

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
  do {
    newFocusIndex =
      (newFocusIndex + direction + menuItemsDom.length) % menuItemsDom.length;
  } while (
    menuItemsDom[newFocusIndex].getAttribute(menuItemDataAttributeHidden) ===
    "true"
  );

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
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const disabled = useIsAssigningKeys();

  useActionTap({
    action: "away",
    handler: useCallback(() => {
      if (containerRef.current === null) return;

      return moveFocus(-1);
    }, [containerRef]),
    disabled,
  });

  useActionTap({
    action: "towards",
    handler: useCallback(() => {
      if (containerRef.current === null) return;

      return moveFocus(1);
    }, [containerRef]),
    disabled,
  });
};

export const MenuItems = ({
  className = "",
  children,
}: PropsWithChildren<{ className?: string }>) => {
  const ref = useRef<HTMLDivElement>(null);

  // on mount, find the first menu item and set it to selected in the store
  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    if (store.getState().openMenus[0].focussedItemId !== undefined) {
      // have already a selection, no need to select the first item
      return;
    }

    const menuItemsDom = findMenuItems();

    store.dispatch(
      setFocussedMenuItemId({
        focussedItemId: menuItemsDom[0].getAttribute(menuItemDataAttributeId)!,
        scrollableSelection: true,
      }),
    );
  }, []);

  useMenuNavigationInput(ref);

  return (
    <div
      ref={ref}
      className={twMerge(
        "grid grid-cols-menuItems gap-x-1 gap-y-oneScaledPix " +
          // by default on mobile, the gaps between the items are bigger, and they are further apart - otherwise they
          // are too difficult to hit with a finger
          "mobile:!gap-y-1 mobile:sprites-double-height",
        className,
      )}
    >
      {children}
    </div>
  );
};
