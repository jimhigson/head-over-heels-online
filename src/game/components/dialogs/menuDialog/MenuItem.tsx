import Portal from "@mutabazia/react-portal";
import { type ReactElement, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { openExternal } from "../../../../utils/tauri/openExternalLink";
import { BitmapText } from "../../tailwindSprites/Sprite";
import { MenuItemLeader } from "./dialogs/MenuItemLeader";
import { useMenuItem } from "./dialogs/menus/useMenuItem";
import { multilineTextClass } from "./multilineTextClass";

export type MenuItemProps = {
  id: string;
  label: ReactElement | string;
  valueElement?: ReactElement;
  flipLeader?: boolean;
  doubleHeight?: boolean;
  doubleHeightWhenFocussed?: boolean;
  leader?: ReactElement;
  hidden?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
  hint?: ReactElement | string;
  hintInline?: boolean;
  verticalAlignItemsCentre?: boolean;
  opensSubMenu?: boolean;
  toParentMenu?: boolean;
  /**
   * if given, the menu item is a link, probably to
   * a url external to this app
   */
  href?: string;
};

const noop = () => {};

export const MenuItem = ({
  id,
  label,
  valueElement,
  flipLeader = false,
  doubleHeight = false,
  doubleHeightWhenFocussed,
  onSelect = noop,
  hidden = false,
  disabled = false,
  hintInline = false,
  className,
  hint,
  leader,
  verticalAlignItemsCentre = false,
  opensSubMenu = false,
  toParentMenu = false,
  href,
}: MenuItemProps) => {
  const reifiedOnSelect = useCallback<() => void>(() => {
    if (href) {
      openExternal(href);
    }
    onSelect();
  }, [href, onSelect]);

  const { menuItemProps, ref, focussed } = useMenuItem({
    id,
    hidden,
    disabled,
    onSelect: reifiedOnSelect,
  });

  const menuItem = (
    // contents div puts children into the grid layout:
    <li
      {...menuItemProps}
      role="menuitem"
      data-opens-submenu={opensSubMenu}
      data-to-parent-menu={toParentMenu}
      className={twMerge(
        "contents cursor-pointer",
        hidden ? "hidden" : "",
        doubleHeight || (doubleHeightWhenFocussed && focussed) ?
          "sprites-double-height"
        : "",
        focussed ? "selectedMenuItem" : "",
        className,
      )}
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
        ref={ref}
        role={href ? "link" : undefined}
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
      {valueElement && (
        <div
          className={`flex ${verticalAlignItemsCentre === true ? "items-center" : ""}`}
        >
          {valueElement}
        </div>
      )}
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
        <div className="col-span-2 col-start-2 mb-1">
          {typeof hint === "string" ?
            <BitmapText className={multilineTextClass}>{hint}</BitmapText>
          : hint}
        </div>
      </>
    );
  } else {
    return menuItem;
  }
};
