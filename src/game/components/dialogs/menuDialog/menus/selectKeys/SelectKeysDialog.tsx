import { useAppSelector } from "../../../../../../store/hooks";
import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";
import {
  selectCurrentInputPreset,
  selectIsAssigningKeys,
  useIsAnalogueControl,
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
import { ValueSwitch } from "../../ValueSwitch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";

const analogueControlOffHintMarkdown =
  "**analog off**: true to the original. *4* walk directions";

const analogueControlOnHintMarkdown =
  "**analog on**: *any* direction with analogue stick, or *8-way* with d-pad/keys";

const screenRelativeControlOffHintMarkdown =
  "**world**: Control is relative to directions in the isometric world";

const screenRelativeControlOnHintMarkdown =
  "**screen**: Control is relative to the screen. More intuitive for people who find the directions hard in isometric games";

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
    <span>
      <BitmapText
        className={twMerge(
          `text-nowrap me-1`,
          "text-pink zx:text-zxRed selectedMenuItem:text-pinkHalfbrite zx:selectedMenuItem:text-zxRed",
          className,
        )}
      >
        {useIsScreenRelativeControl() ? "screen" : "world"}
      </BitmapText>
      <BitmapText
        className={twMerge(
          `text-nowrap`,
          "text-moss zx:text-zxBlue selectedMenuItem:text-mossHalfbrite zx:selectedMenuItem:text-zxBlue",
          className,
        )}
      >
        {useIsScreenRelativeControl() ? "⬅ ➡ ⬆ ⬇" : "↖ ↘ ↗ ↙"}
      </BitmapText>
    </span>
  );
};

const ScreenRelativeControlSection = () => {
  return (
    <MenuItem
      id="screenRelativeControl"
      label="axes"
      valueElement={<ScreenRelativeControlValue />}
      onSelect={useDispatchActionCallback(
        toggleBoolean,
        "userSettings.screenRelativeControl",
      )}
      hintInline
      hint={
        <BlockyMarkdown
          className={`text-midGrey zx:text-zxBlack`}
          markdown={
            useIsScreenRelativeControl() ?
              screenRelativeControlOnHintMarkdown
            : screenRelativeControlOffHintMarkdown
          }
        />
      }
    />
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
        <div
          className={
            "overflow-y-scroll " +
            "scrollbar  scrollbar-w-1 " +
            "scrollbar-thumb-midGrey scrollbar-track-white " +
            "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite "
          }
        >
          <BitmapText className="text-midRed zx:text-zxBlue sprites-double-height block mx-auto mb-1">
            control options
          </BitmapText>
          <MenuItems className="text-metallicBlue zx:text-zxBlue !gap-y-1 selectedMenuItem:text-metallicBlueHalfbrite zx:selectedMenuItem:text-zxGreen">
            <MenuItem
              id="analogueControl"
              label={
                <BitmapText
                  className={`inline-block w-6 ${multilineTextClass}`}
                >
                  Analog/ 8-way control
                </BitmapText>
              }
              leader={
                <span className="sprite zx:sprite-revert-to-two-tone texture-joystick" />
              }
              valueElement={
                <ValueSwitch
                  value={useAppSelector(
                    (state) => state.userSettings.analogueControl,
                  )}
                />
              }
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.analogueControl",
              )}
              hintInline
              hint={
                <BlockyMarkdown
                  className="text-midGrey zx:text-zxBlack"
                  markdown={
                    useIsAnalogueControl() ?
                      analogueControlOnHintMarkdown
                    : analogueControlOffHintMarkdown
                  }
                />
              }
            />
            {useIsAnalogueControl() && <ScreenRelativeControlSection />}

            <MenuItem
              id="preset"
              label={
                <BitmapText
                  className={`inline-block w-6 ${multilineTextClass}`}
                >
                  key/ button preset
                </BitmapText>
              }
              valueElement={<CurrentPresetValue />}
              onSelect={useDispatchActionCallback(goToSubmenu, "inputPreset")}
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
            <div className={`${multilineTextClass} col-span-3`}>
              <BitmapText className="text-midRed bg-pureBlack inline-block zx:text-zxRed zx:bg-zxYellow me-1">
                Note:
              </BitmapText>
              <BitmapText className="text-midGrey zx:text-zxBlack">
                some puzzles require you to jump and pick up simultaneously -
                assign a key for both jump and carry
              </BitmapText>
            </div>
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
