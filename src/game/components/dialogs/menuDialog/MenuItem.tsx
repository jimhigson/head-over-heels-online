import Portal from "@mutabazia/react-portal";
import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { BitmapText } from "../../tailwindSprites/Sprite";
import { useActionTap } from "../useActionTap";
import { MenuItemLeader } from "./dialogs/MenuItemLeader";
import { useMenuItem } from "./dialogs/menus/useMenuItem";
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
  const { menuItemProps, ref, focussed } = useMenuItem({
    id,
    hidden,
    disabled,
    onSelect,
  });

  useActionTap({
    action: menuSelectOrJump,
    handler: onSelect,
    disabled: !focussed || hidden || disabled,
  });

  const menuItem = (
    // contents div puts children into the grid layout:
    <li
      {...menuItemProps}
      className={twMerge(
        "contents",
        hidden ? "hidden" : "",
        doubleHeightWhenFocussed && focussed ? "sprites-double-height" : "",
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
        <div className="col-span-2 col-start-2 mb-2">{hint}</div>
      </>
    );
  } else {
    return menuItem;
  }
};
