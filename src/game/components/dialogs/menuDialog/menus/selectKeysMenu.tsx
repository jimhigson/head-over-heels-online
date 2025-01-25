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

const valueClass = (selected: boolean) =>
  selected ?
    "text-midRedHalfbrite zx:text-zxRedDimmed"
  : "text-midRed zx:text-zxMagentaDimmed";

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
        keyClassName={valueClass(selected)}
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
      className={twMerge(`text-nowrap`, valueClass(selected), className)}
    >
      {currentPresetName ?? "custom"}
    </BitmapText>
  );
};

export const selectKeysMenu: Menu = {
  dialogClassName: "bg-lightGrey zx:bg-zxWhiteDimmed",
  borderClassName: "bg-midRedHalfbrite zx:bg-zxRedDimmed",
  Content() {
    return (
      <>
        <BitmapText className="text-metallicBlueHalfbrite zx:text-zxBlue sprites-double-height">
          Select the keys
        </BitmapText>
        <div
          className={
            "overflow-y-scroll " +
            "scrollbar  scrollbar-w-1 " +
            "scrollbar-thumb-midGrey scrollbar-track-lightGrey " +
            "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhiteDimmed "
          }
        >
          <div className={`mb-1 ${multilineTextClass}`}>
            <BitmapText className="text-midRed bg-lightGreyHalfbrite inline-block zx:text-zxRed zx:bg-zxYellow me-1">
              Note:
            </BitmapText>
            <BitmapText className="text-lightGreyHalfbrite zx:text-zxBlack">
              some puzzles require you to jump and pick up simultaneously -
              assign a key for both jump and carry
            </BitmapText>
          </div>
          <MenuItems
            className="text-metallicBlue zx:text-zxBlue !gap-y-1"
            selectedClassName="text-metallicBlueHalfbrite zx:text-zxBlueDimmed"
          />
        </div>
        <SelectedItemHint className="text-metallicBlue zx:text-zxBlue" />
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
      label: "Up ↗",
      action: "away",
      ValueComponent: MenuItemKeyAssignment("away"),
    },
    {
      type: "key",
      label: "Down ↙",
      action: "towards",
      ValueComponent: MenuItemKeyAssignment("towards"),
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
    {
      type: "key",
      label: "Colours",
      action: "toggleColourisation",
      ValueComponent: MenuItemKeyAssignment("toggleColourisation"),
    },
    backMenuItem,
  ],
};
