import { useAppSelector } from "../../../../../store/hooks";
import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";
import { SelectKeysMenuFooter } from "./SelectKeysMenuFooter";
import { MenuItems } from "../MenuItems";
import { backMenuItem } from "../backMenuItem";
import { SelectedItemHint } from "../SelectedItemHint";
import { multilineTextClass } from "../multilineTextClass";
import {
  selectCurrentInputPreset,
  selectIsAssigningKeys,
  useIsAssigningKeys,
} from "../../../../../store/selectors";
import { twMerge } from "tailwind-merge";
import type { ValueComponent } from "../MenuItem";
import { useCallback } from "react";
import {
  doneAssigningInput,
  inputAddedDuringAssignment,
} from "../../../../../store/gameMenusSlice";
import { store } from "../../../../../store/store";
import { useActionTap, useInputTap } from "../../useActionInput";
import { SelectKeysMenuAssignmentValue } from "./SelectKeysMenuAssignmentValue";

const useKeyAssignmentInput = () => {
  // TODO: move to the select keys menu
  const disabled = !useIsAssigningKeys();

  useActionTap({
    action: "menu_openOrExit",

    handler: useCallback(() => {
      store.dispatch(doneAssigningInput());
    }, []),
    disabled,
  });
  useInputTap({
    handler: useCallback((inputPress, inputStateTracker) => {
      if (
        inputStateTracker.currentActionPress("menu_openOrExit") !== "released"
      ) {
        // the only key that can't be assigned is one that maps to the action to stop assigning
        return;
      }
      if (!selectIsAssigningKeys(store.getState())) {
        // it isn't guaranteed we will be disabled in time for a second press
        return;
      }

      store.dispatch(inputAddedDuringAssignment(inputPress));
    }, []),
    disabled,
  });
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
    useKeyAssignmentInput();

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
      ValueComponent: SelectKeysMenuAssignmentValue("left"),
    },
    {
      type: "key",
      label: "Right ↘",
      action: "right",
      ValueComponent: SelectKeysMenuAssignmentValue("right"),
    },
    {
      type: "key",
      label: "Up ↗",
      action: "away",
      ValueComponent: SelectKeysMenuAssignmentValue("away"),
    },
    {
      type: "key",
      label: "Down ↙",
      action: "towards",
      ValueComponent: SelectKeysMenuAssignmentValue("towards"),
    },
    {
      type: "key",
      label: "Jump",
      action: "jump",
      ValueComponent: SelectKeysMenuAssignmentValue("jump"),
    },
    {
      type: "key",
      label: "Carry",
      action: "carry",
      ValueComponent: SelectKeysMenuAssignmentValue("carry"),
    },
    {
      type: "key",
      label: "Fire",
      action: "fire",
      ValueComponent: SelectKeysMenuAssignmentValue("fire"),
    },
    {
      type: "key",
      label: "Swop",
      action: "swop",
      ValueComponent: SelectKeysMenuAssignmentValue("swop"),
    },
    {
      type: "key",
      label: "Hold",
      action: "hold",
      ValueComponent: SelectKeysMenuAssignmentValue("hold"),
    },
    {
      type: "key",
      label: () => (
        <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
          toggle colour- isation
        </BitmapText>
      ),
      action: "toggleColourisation",
      ValueComponent: SelectKeysMenuAssignmentValue("toggleColourisation"),
    },
    backMenuItem,
  ],
};
