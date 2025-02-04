import { twMerge } from "tailwind-merge";
import { useIsAssigningKeys } from "../../../../store/selectors";
import { useActionTap } from "../useActionInput";
import type { PropsWithChildren, RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";
import { store } from "../../../../store/store";
import {
  menuItemDataAttributeId,
  menuItemDataAttributeHidden,
} from "./MenuItem";
import { setFocussedMenuItemId } from "../../../../store/gameMenusSlice";

const findMenuItems = (container: HTMLDivElement) => {
  const menuItemsDom = container.querySelectorAll(
    `[${menuItemDataAttributeId}]`,
  );
  return Array.from(menuItemsDom);
};

const moveFocus = (container: HTMLDivElement, direction: 1 | -1) => {
  const curFocusId = store.getState().openMenus[0].focussedItemId;

  if (curFocusId === undefined) {
    return; // nothing is selected yet, so can't move the selection up
  }

  const menuItemsDom = findMenuItems(container);

  if (menuItemsDom.length === 0) {
    return; // no menu items to select
  }

  const curFocusIndex = menuItemsDom.findIndex(
    (miDom) => miDom.getAttribute(menuItemDataAttributeId) === curFocusId,
  );

  if (curFocusIndex === -1) {
    return; // whatever is focussed isn't in virtual dom any more - not sure if this is possible
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
};

const useMenuNavigationInput = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const disabled = useIsAssigningKeys();

  useActionTap({
    action: "away",
    handler: useCallback(() => {
      if (containerRef.current !== null) {
        moveFocus(containerRef.current, -1);
      }
    }, [containerRef]),
    disabled,
  });

  useActionTap({
    action: "towards",
    handler: useCallback(() => {
      if (containerRef.current !== null) {
        moveFocus(containerRef.current, 1);
      }
    }, [containerRef]),
    disabled,
  });
};

export const MenuItems = ({
  className = "",
  children,
}: PropsWithChildren<{ className?: string }>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    if (store.getState().openMenus[0].focussedItemId !== undefined) {
      // have already a selection, no need to select the first item
      return;
    }

    const menuItemsDom = findMenuItems(ref.current);

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
        "grid grid-cols-menuItems gap-x-1 gap-y-oneScaledPix",
        className,
      )}
    >
      {children}
    </div>
  );
};
