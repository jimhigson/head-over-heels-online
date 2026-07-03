import { useCallback } from "preact/hooks";
import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { useAppDispatch } from "../../../../store/hooks";
import { goToSubmenu } from "../../../../store/slices/gameMenus/gameMenusSlice";
import { detectDeviceType } from "../../../../utils/detectEnv/detectDeviceType";
import { openExternal } from "../../../../utils/tauri/openExternalLink";
import { type DialogId } from "./DialogId";
import { useMenuItem } from "./dialogs/menus/useMenuItem";
import { StandardMenuItemLeader } from "./dialogs/StandardMenuItemLeader";

export type CustomLeaderComponent = (props: {
  doubleHeight: boolean;
}) => ReactElement;
type BaseMenuItemProps = {
  id: string;
  label: ReactElement | string;
  valueElement?: ReactElement;
  isBack?: boolean;
  doubleHeight?: boolean;
  doubleHeightWhenFocussed?: boolean;
  leader?: CustomLeaderComponent | ReactElement;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
  hint?: ReactElement | string;
  verticalAlignItemsCentre?: boolean;
  // explicity state if this menu item opens a sub-menu or not. Usually this can be implied
  opensSubMenu?: boolean;
  toParentMenu?: boolean;
};

type LinkMenuItemProps = BaseMenuItemProps & {
  /**
   * if given, the menu item is a link, probably to
   * a url external to this app
   */
  href?: string;
  subMenuId?: undefined;
  onSelect?: undefined;
};

type SubMenuMenuItemProps = BaseMenuItemProps & {
  subMenuId: DialogId;
  href?: undefined;
  onSelect?: undefined;
};

type CallbackMenuItemProps = BaseMenuItemProps & {
  onSelect?: () => void;
  subMenuId?: undefined;
  href?: undefined;
};

export type MenuItemProps =
  | CallbackMenuItemProps
  | LinkMenuItemProps
  | SubMenuMenuItemProps;

const noop = () => {};

export const MenuItem = ({
  id,
  label,
  valueElement,
  isBack = false,
  doubleHeight = detectDeviceType() === "mobile",
  doubleHeightWhenFocussed,
  onSelect = noop,
  hidden = false,
  disabled = false,
  className,
  hint,
  leader,
  verticalAlignItemsCentre = false,
  toParentMenu = false,
  href,
  subMenuId,
  opensSubMenu = subMenuId !== undefined,
}: MenuItemProps) => {
  const dispatch = useAppDispatch();

  const resolvedOnSelect = useCallback<() => void>(() => {
    if (href) {
      openExternal(href);
    } else if (subMenuId) {
      dispatch(goToSubmenu(subMenuId));
    } else {
      onSelect();
    }
  }, [dispatch, href, onSelect, subMenuId]);

  const { menuItemProps, ref, focussed } = useMenuItem({
    id,
    hidden,
    disabled,
    onSelect: resolvedOnSelect,
  });

  const doubleHeightNow =
    doubleHeight || (doubleHeightWhenFocussed && focussed);

  const Leader = leader;
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
        focussed ? "selectedMenuItem" : "",
        className,
      )}
    >
      {/* first column content (leader/icon thing)... */}

      {Leader ?
        typeof Leader === "function" ?
          <Leader doubleHeight={!!doubleHeightNow} />
        : Leader
      : <StandardMenuItemLeader
          verticalAlignItemsCentre={verticalAlignItemsCentre}
          isBack={isBack}
          focussed={focussed}
          doubleHeight={doubleHeightNow}
        />
      }
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
        {doubleHeightNow ?
          <span className="text-double-height">{label}</span>
        : typeof label === "string" ?
          <span className="text-single-line">{label}</span>
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
    </li>
  );

  if (hint) {
    return (
      <>
        {menuItem}
        <div className="col-span-2 col-start-2 mb-1">
          {typeof hint === "string" ?
            <span className="text-multi-line">{hint}</span>
          : hint}
        </div>
      </>
    );
  }

  return menuItem;
};
