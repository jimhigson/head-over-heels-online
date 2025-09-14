import { useRef } from "react";

import { useAppSelector } from "../../../../../../store/hooks";
import { setFocussedMenuItemId } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { useActionTap } from "../../../useActionTap";
import {
  menuItemDataAttributeDisabled,
  menuItemDataAttributeHidden,
  menuItemDataAttributeId,
} from "./menuItemDataAttributes";

// having swop in here marks the swop key as handled, so the game can't immediately
// swap chars on loading (hitting return to leave menu and enter the game)
const menuSelectOrJump = ["menu_select", "swop", "jump"] as const;

const noop = () => {};

/**
 * utility hook for all menu item-like things to use
 * for handling keys, focus, scrolling-to-view etc
 */
export const useMenuItem = ({
  id,
  hidden = false,
  disabled = false,
  onSelect = noop,
}: {
  id: string;
  hidden?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}) => {
  const isFirstRender = useRef<boolean>(true);

  const scrollIntoView = useAppSelector((state) => {
    return state.gameMenus.openMenus.at(0)?.scrollableSelection ?? false;
  });

  const focussed = useAppSelector(
    (state) => state.gameMenus.openMenus.at(0)?.focussedItemId === id,
  );

  useActionTap({
    action: menuSelectOrJump,
    handler: onSelect,
    disabled: !focussed || hidden || disabled,
  });

  return {
    /** props to spread onto the top menu item dom element */
    menuItemProps: {
      // data attributes required for MenuItems to this this MenuItem in the dom:
      [menuItemDataAttributeId]: id,
      [menuItemDataAttributeHidden]: hidden,
      [menuItemDataAttributeDisabled]: disabled,
      onMouseMove: useDispatchActionCallback(setFocussedMenuItemId, {
        focussedItemId: id,
        scrollableSelection: false,
      }),
      onClick: disabled ? undefined : onSelect,
      tabIndex: 0,
      role: "menuitem",
    },

    ref(ele: HTMLDivElement) {
      if (focussed && scrollIntoView) {
        ele?.scrollIntoView({
          behavior:
            isFirstRender.current ?
              // instant: ie, if coming back to a menu from a child menu with an item half-way down
              // already selected (ie, reading the manual and going back up to manual index)
              //  - in this case we don't want to smoothly scroll
              "instant"
            : "smooth",
          block: "center",
        });
      }
      isFirstRender.current = false;
    },

    focussed,
  };
};
