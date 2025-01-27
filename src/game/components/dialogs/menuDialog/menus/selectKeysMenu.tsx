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
  ({ className }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- this is really a component (a HOC)
    const assigning = useAppSelector(
      (store) => store.assigningInput?.action === action,
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks -- this is really a component (a HOC)
    const inputs = useAppSelector((store) =>
      store.assigningInput?.action === action ?
        store.assigningInput?.inputs
      : store.userSettings.inputAssignment[action],
    );

    return (
      <CurrentKeyAssignment
        className={twMerge(
          "flex flex-wrap gap-y-oneScaledPix gap-x-1",
          className,
        )}
        inputs={inputs}
        keyClassName={
          "text-pink zx:text-zxRed selectedMenuItem:text-pinkHalfbrite zx:selectedMenuItem:text-zxRed"
        }
        // me-0 prevents a gap after the delim, since we do that with gap-x-1 instead
        deliminatorClassName="me-0"
        flashingCursor={assigning}
        noCommas
      />
    );
  };

const CurrentPresetValue: ValueComponent = ({ className }) => {
  const currentPresetName = useAppSelector(selectCurrentInputPreset);

  return (
    <BitmapText
      className={twMerge(
        `text-nowrap`,
        "text-pink zx:text-zxRed selectedMenuItem:text-pinkHalfbrite zx:selectedMenuItem:text-zxRed",
        className,
      )}
    >
      {currentPresetName ?? "custom"}
    </BitmapText>
  );
};

export const selectKeysMenu: Menu = {
  dialogClassName: "bg-white zx:bg-zxWhite",
  borderClassName: "bg-lightGrey zx:bg-zxRedDimmed",
  Content() {
    return (
      <>
        <BitmapText className="text-midRed zx:text-zxBlue sprites-double-height block mx-auto">
          Select the keys
        </BitmapText>
        <div
          className={
            "overflow-y-scroll " +
            "scrollbar  scrollbar-w-1 " +
            "scrollbar-thumb-midGrey scrollbar-track-white " +
            "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite "
          }
        >
          <div className={`mb-1 ${multilineTextClass}`}>
            <BitmapText className="text-midRed bg-pureBlack inline-block zx:text-zxRed zx:bg-zxYellow me-1">
              Note:
            </BitmapText>
            <BitmapText className="text-midGrey zx:text-zxBlack">
              some puzzles require you to jump and pick up simultaneously -
              assign a key for both jump and carry
            </BitmapText>
          </div>
          <MenuItems className="text-metallicBlue zx:text-zxBlue !gap-y-1 selectedMenuItem:text-metallicBlueHalfbrite zx:selectedMenuItem:text-zxGreenDimmed" />
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
      label: () => (
        <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
          toggle colour- isation
        </BitmapText>
      ),
      action: "toggleColourisation",
      ValueComponent: MenuItemKeyAssignment("toggleColourisation"),
    },
    backMenuItem,
  ],
};
