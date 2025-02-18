import { useAppSelector } from "../../../../../../store/hooks";
import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";
import {
  selectCurrentInputPreset,
  selectIsAssigningKeys,
  useIsAssigningKeys,
  useIsScreenRelativeControl,
} from "../../../../../../store/selectors";
import { twMerge } from "tailwind-merge";
import { MenuItem } from "../../MenuItem";
import { useCallback } from "react";
import {
  assignInputStart,
  backToParentMenu,
  doneAssigningInput,
  goToSubmenu,
  inputAddedDuringAssignment,
  toggleBoolean,
} from "../../../../../../store/gameMenusSlice";
import { store } from "../../../../../../store/store";
import { useActionTap, useInputTap } from "../../../useActionTap";
import { SelectKeysMenuAssignmentValue } from "./SelectKeysMenuAssignmentValue";
import { Border, Dialog } from "../../../../../../components/ui/dialog";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BackMenuItem } from "../../BackMenuItem";
import { SelectKeysMenuFooter } from "./SelectKeysMenuFooter";
import { DialogPortal } from "../../../../../../components/ui/DialogPortal";

const useKeyAssignmentInput = () => {
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
      console.log("useKeyAssignmentInput:: got input press", inputPress);

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

const CurrentPresetValue = ({ className }: { className?: string }) => {
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

const ScreenRelativeControlValue = ({ className }: { className?: string }) => {
  return (
    <BitmapText
      className={twMerge(
        `text-nowrap`,
        "text-pink zx:text-zxRed selectedMenuItem:text-pinkHalfbrite zx:selectedMenuItem:text-zxRed",
        className,
      )}
    >
      {useIsScreenRelativeControl() ? "screen" : "world"}
    </BitmapText>
  );
};

export const SelectKeysDialog = () => {
  useKeyAssignmentInput();
  const isScreenRelativeControl = useIsScreenRelativeControl();

  return (
    <DialogPortal>
      <Border
        className="bg-lightGrey zx:bg-zxRedDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-white zx:bg-zxWhite pr-0">
        <BitmapText className="text-midRed zx:text-zxBlue sprites-double-height block mx-auto">
          Select the controls
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
          <MenuItems className="text-metallicBlue zx:text-zxBlue !gap-y-1 selectedMenuItem:text-metallicBlueHalfbrite zx:selectedMenuItem:text-zxGreen">
            <MenuItem
              id="preset"
              label="preset:"
              valueElement={<CurrentPresetValue />}
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(goToSubmenu, "inputPreset")}
            />
            <MenuItem
              id="screenRelativeControl"
              label="direction"
              valueElement={<ScreenRelativeControlValue />}
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.screenRelativeControl",
              )}
            />
            <MenuItem
              id="left"
              label={`Left ${isScreenRelativeControl ? "⬅" : "↖"}`}
              leader={
                <span
                  className={`sprite zx:sprite-revert-to-two-tone ${
                    isScreenRelativeControl ?
                      "texture-head.walking.towardsLeft.2 selectedMenuItem:texture-animated-head.walking.towardsLeft"
                    : "texture-head.walking.left.2 selectedMenuItem:texture-animated-head.walking.left"
                  }`}
                />
              }
              valueElement={<SelectKeysMenuAssignmentValue action="left" />}
              onSelect={useDispatchActionCallback(assignInputStart, "left")}
            />
            <MenuItem
              id="right"
              label={`Right ${isScreenRelativeControl ? "➡" : "↘"}`}
              leader={
                <span
                  className={`sprite zx:sprite-revert-to-two-tone ${
                    isScreenRelativeControl ?
                      "texture-head.walking.awayRight.2 selectedMenuItem:texture-animated-head.walking.awayRight"
                    : "texture-head.walking.right.2 selectedMenuItem:texture-animated-head.walking.right"
                  }`}
                />
              }
              valueElement={<SelectKeysMenuAssignmentValue action="right" />}
              onSelect={useDispatchActionCallback(assignInputStart, "right")}
            />
            <MenuItem
              id="up"
              label={`Up ${isScreenRelativeControl ? "⬆" : "↗"}`}
              leader={
                <span
                  className={`sprite zx:sprite-revert-to-two-tone ${
                    isScreenRelativeControl ?
                      "texture-head.walking.awayLeft.2 selectedMenuItem:texture-animated-head.walking.awayLeft"
                    : "texture-head.walking.away.2 selectedMenuItem:texture-animated-head.walking.away"
                  }`}
                />
              }
              valueElement={<SelectKeysMenuAssignmentValue action="away" />}
              onSelect={useDispatchActionCallback(assignInputStart, "away")}
            />
            <MenuItem
              id="down"
              label={`Down ${isScreenRelativeControl ? "⬇" : "↙"}`}
              leader={
                <span
                  className={`sprite zx:sprite-revert-to-two-tone ${
                    isScreenRelativeControl ?
                      "texture-head.walking.towardsRight.2 selectedMenuItem:texture-animated-head.walking.towardsRight"
                    : "texture-head.walking.towards.2 selectedMenuItem:texture-animated-head.walking.towards"
                  }`}
                />
              }
              valueElement={<SelectKeysMenuAssignmentValue action="towards" />}
              onSelect={useDispatchActionCallback(assignInputStart, "towards")}
            />
            <MenuItem
              id="jump"
              label="Jump"
              valueElement={<SelectKeysMenuAssignmentValue action="jump" />}
              onSelect={useDispatchActionCallback(assignInputStart, "jump")}
            />
            <MenuItem
              id="carry"
              label="Carry"
              leader={
                <span className="sprite texture-bag zx:sprite-revert-to-two-tone" />
              }
              valueElement={<SelectKeysMenuAssignmentValue action="carry" />}
              onSelect={useDispatchActionCallback(assignInputStart, "carry")}
            />
            <MenuItem
              id="fire"
              label={
                <BitmapText
                  className={`inline-block w-6 ${multilineTextClass}`}
                >
                  fire dough- nuts
                </BitmapText>
              }
              leader={
                <span className="sprite texture-doughnuts zx:sprite-revert-to-two-tone" />
              }
              valueElement={<SelectKeysMenuAssignmentValue action="fire" />}
              onSelect={useDispatchActionCallback(assignInputStart, "fire")}
            />
            <MenuItem
              id="swop"
              label="Swop"
              valueElement={<SelectKeysMenuAssignmentValue action="swop" />}
              onSelect={useDispatchActionCallback(assignInputStart, "swop")}
            />
            <MenuItem
              id="hold"
              label="Hold"
              valueElement={<SelectKeysMenuAssignmentValue action="hold" />}
              onSelect={useDispatchActionCallback(assignInputStart, "hold")}
            />
            <MenuItem
              id="toggleColourisation"
              label={
                <BitmapText
                  className={`inline-block w-6 ${multilineTextClass}`}
                >
                  toggle colour- isation
                </BitmapText>
              }
              valueElement={
                <SelectKeysMenuAssignmentValue action="toggleColourisation" />
              }
              onSelect={useDispatchActionCallback(
                assignInputStart,
                "toggleColourisation",
              )}
            />
            <BackMenuItem />
          </MenuItems>
        </div>
        <SelectKeysMenuFooter />
      </Dialog>
    </DialogPortal>
  );
};
