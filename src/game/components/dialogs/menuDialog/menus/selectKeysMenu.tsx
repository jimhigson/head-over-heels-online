import { useAppSelector } from "../../../../../store/hooks";
import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";
import { SelectKeysMenuFooter } from "./SelectKeysMenuFooter";
import { MenuItems } from "../MenuItems";
import { backMenuItem } from "../backMenuItem";
import { SelectedItemHint } from "../SelectedItemHint";
import { multilineTextClass } from "../multilineTextClass";
import { selectCurrentInputPreset } from "../../../../../store/selectors";
import type { Action } from "../../../../input/InputState";
import { CurrentKeyAssignment } from "../CurrentKeyAssignment";
import { twMerge } from "tailwind-merge";
import type { ValueComponent } from "../MenuItem";

const MenuItemKeyAssignment =
  (action: Action): ValueComponent =>
  ({ className, selected }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const assigningThisAction = useAppSelector(
      (store) => store.actionBeingAssignedKeys === action,
    );

    return (
      <CurrentKeyAssignment
        className={twMerge(
          "flex flex-wrap gap-y-oneScaledPix gap-x-1",
          className,
        )}
        action={action}
        keyClassName={selected ? "text-redShadow" : "text-midRed"}
        // me-0 prevents a gap after the delim, since we do that with gap-x-1 instead
        deliminatorClassName="me-0"
        flashingCursor={assigningThisAction}
      />
    );
  };

const CurrentPresetValue: ValueComponent = ({ className, selected }) => {
  const currentPresetName = useAppSelector(selectCurrentInputPreset);

  return (
    <BitmapText
      className={twMerge(
        `text-nowrap`,
        selected ? "text-redShadow" : "text-midRed",
        className,
      )}
    >
      {currentPresetName ?? "custom"}
    </BitmapText>
  );
};

export const selectKeysMenu: Menu = {
  dialogClassName: "bg-lightGrey",
  borderClassName: "bg-redShadow",
  Content() {
    return (
      <>
        <BitmapText className="text-metallicBlue sprites-double-height">
          Select the keys
        </BitmapText>
        <div
          className={
            "overflow-y-scroll " +
            "scrollbar scrollbar-thumb-midGrey scrollbar-w-1 scrollbar-track-lightGrey"
          }
        >
          <div className={`mb-1 ${multilineTextClass}`}>
            <BitmapText className="text-midRed">Note: </BitmapText>
            <BitmapText className="text-midGrey">
              some puzzles require you to jump and pick up simultaneously -
              assign a key for both jump and carry
            </BitmapText>
          </div>
          <MenuItems
            className="text-metallicBlue !gap-y-1"
            selectedClassName="text-shadow"
          />
        </div>
        <SelectedItemHint className="text-metallicBlue" />
        <SelectKeysMenuFooter />
      </>
    );
  },
  items: [
    {
      type: "submenu",
      label: "preset:",
      ValueComponent: CurrentPresetValue,
      submenu: "inputPreset",
      disableDoubling: true,
    },
    {
      type: "key",
      label: "Left ↖",
      action: "left",
      ValueComponent: MenuItemKeyAssignment("left"),
    },
    {
      type: "key",
      label: "Right ↘",
      action: "right",
      ValueComponent: MenuItemKeyAssignment("right"),
    },
    {
      type: "key",
      label: "Down ↙",
      action: "towards",
      ValueComponent: MenuItemKeyAssignment("towards"),
    },
    {
      type: "key",
      label: "Up ↗",
      action: "away",
      ValueComponent: MenuItemKeyAssignment("away"),
    },
    {
      type: "key",
      label: "Jump",
      action: "jump",
      ValueComponent: MenuItemKeyAssignment("jump"),
    },
    {
      type: "key",
      label: "Carry",
      action: "carry",
      ValueComponent: MenuItemKeyAssignment("carry"),
    },
    {
      type: "key",
      label: "Fire",
      action: "fire",
      ValueComponent: MenuItemKeyAssignment("fire"),
    },
    {
      type: "key",
      label: "Swop",
      action: "swop",
      ValueComponent: MenuItemKeyAssignment("swop"),
    },
    {
      type: "key",
      label: "Hold",
      action: "hold",
      ValueComponent: MenuItemKeyAssignment("hold"),
    },
    {
      type: "key",
      label: "Menu",
      action: "menu",
      ValueComponent: MenuItemKeyAssignment("menu"),
    },
    backMenuItem,
  ],
};
