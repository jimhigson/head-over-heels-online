import Portal from "@mutabazia/react-portal";
import { type ReactElement, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { useAppSelector } from "../../../../store/hooks";
import { setFocussedMenuItemId } from "../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../store/useDispatchActionCallback";
import { BitmapText } from "../../tailwindSprites/Sprite";
import { useActionTap } from "../useActionTap";
import { MenuItemLeader } from "./dialogs/MenuItemLeader";
import { multilineTextClass } from "./multilineTextClass";

export type MenuItemProps = {
  id: string;
  label: ReactElement | string;
  valueElement?: ReactElement;
  flipLeader?: boolean;
  doubleHeightWhenFocussed?: boolean;
  leader?: ReactElement;
  hidden?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
  hint?: ReactElement | string;
  hintInline?: boolean;
  verticalAlignItemsCentre?: boolean;
};

// having swop in here marks the swop key as handled, so the game can't immediately
// swap chars on loading
const menuSelectOrJump = ["menu_select", "swop", "jump"] as const;

export const menuItemDataAttributeId = "data-menuitem_id";
export const menuItemDataAttributeHidden = "data-menuitem_hidden";
export const menuItemDataAttributeDisabled = "data-menuitem_disabled";

const noop = () => {};

export const MenuItem = ({
  id,
  label,
  valueElement,
  flipLeader = false,
  doubleHeightWhenFocussed,
  onSelect = noop,
  hidden = false,
  disabled = false,
  hintInline = false,
  className,
  hint,
  leader,
  verticalAlignItemsCentre = false,
}: MenuItemProps) => {
  //useUnchanging(onSelect, "onSelect"); <- commented out, breaks HMR
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

  const menuItem = (
    // contents div puts children into the grid layout:
    <li
      {...{
        // data attributes required for MenuItems to this this MenuItem in the dom:
        [menuItemDataAttributeId]: id,
        [menuItemDataAttributeHidden]: hidden,
        [menuItemDataAttributeDisabled]: disabled,
      }}
      tabIndex={0}
      role="menuitem"
      className={twMerge(
        "contents",
        hidden ? "hidden" : "",
        doubleHeightWhenFocussed && focussed ? "sprites-double-height" : "",
        focussed ? "selectedMenuItem" : "",
        className,
      )}
      onMouseMove={useDispatchActionCallback(setFocussedMenuItemId, {
        focussedItemId: id,
        scrollableSelection: false,
      })}
      onClick={disabled ? undefined : onSelect}
    >
      {/* first column content (leader/icon thing)... */}
      {leader || (
        <MenuItemLeader
          verticalAlignItemsCentre={verticalAlignItemsCentre}
          flip={flipLeader}
          focussed={focussed}
        />
      )}

      {/* second column content (main label)... */}
      <div
        ref={(ele) => {
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
        }}
        role="menuitem"
        className={twMerge(
          // if there is no value to show, take up the third column too:
          valueElement === undefined ? "col-span-2" : "",

          verticalAlignItemsCentre === true ? "flex items-center" : "",

          // back buttons are usually at the bottom so set them away
          // from the normal menu items:
          // menuItem.type === "back" ? "mt-1" : "",
          // menuItem.className ?? "",
        )}
      >
        {typeof label === "string" ?
          <>
            <BitmapText>{label}</BitmapText>
          </>
        : label}
      </div>

      {/* third column content (values etc) */}
      {valueElement !== undefined && valueElement}
      {!focussed || hint === undefined || hintInline ? null : (
        <Portal>
          {typeof hint === "string" ?
            <BitmapText className={multilineTextClass}>{hint}</BitmapText>
          : hint}
        </Portal>
      )}
    </li>
  );

  if (hintInline && hint) {
    return (
      <>
        {menuItem}
        <div className="col-span-2 col-start-2 mb-2">{hint}</div>
      </>
    );
  } else {
    return menuItem;
  }
};
