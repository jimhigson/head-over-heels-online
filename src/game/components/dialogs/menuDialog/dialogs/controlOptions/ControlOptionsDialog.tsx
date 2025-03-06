import { useAppSelector } from "../../../../../../store/hooks";
import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";
import {
  selectCurrentInputPreset,
  selectIsAssigningKeys,
  useIsAnalogueControl,
  useIsAssigningKeys,
  useIsOnScreenControls,
  useIsScreenRelativeControl,
} from "../../../../../../store/selectors";
import { twMerge } from "tailwind-merge";
import { MenuItem } from "../../MenuItem";
import { useCallback, useState } from "react";
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
import { Border, Dialog } from "../../../../../../ui/dialog";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BackMenuItem } from "../../BackMenuItem";
import { SelectKeysMenuFooter } from "./SelectKeysMenuFooter";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Switch } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { ScreenRelativeControlSection } from "./ScreenRelativeControlSection";
import { spriteLeaderClasses } from "./spriteLeaderClasses";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";

const analogueControlOffHintMarkdown =
  "**analog off**: true to the original with *4-way* movement";

const analogueControlOnHintMarkdown =
  "**analog on**: move in *any* direction with analogue stick, or *8-way* with d-pad/keys";

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
        "text-pinkHalfbrite zx:text-zxRed selectedMenuItem:text-pink zx:selectedMenuItem:text-zxRed",
        className,
      )}
    >
      {currentPresetName ?? "custom"}
    </BitmapText>
  );
};

const AnalogueControlMenuItem = () => {
  return (
    <MenuItem
      id="analogueControl"
      label={
        <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
          Analog/ 8-way control
        </BitmapText>
      }
      leader={<span className={`${spriteLeaderClasses} texture-joystick`} />}
      valueElement={<Switch value={useIsAnalogueControl()} />}
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
  );
};

const OnScreenControlsMenuItem = () => {
  return (
    <MenuItem
      id="controlOptions"
      label={
        <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
          on- screen controls
        </BitmapText>
      }
      valueElement={<Switch value={useIsOnScreenControls()} />}
      onSelect={useDispatchActionCallback(
        toggleBoolean,
        "userSettings.onScreenControls",
      )}
    />
  );
};

const ExpandToShowAll = ({ showAll }: { showAll: () => void }) => {
  return (
    <>
      <BitmapText className={`col-span-3 ${multilineTextClass}`}>
        Detected that you are on a phone or tablet
      </BitmapText>
      <BitmapText className={`col-span-3 ${multilineTextClass}`}>
        Additional settings for keys and gamepad buttons are designed for
        desktop/laptops, but you can use them on phones/tablets if you have a
        keyboard or gamepad connected
      </BitmapText>
      <BitmapText
        className={`col-span-3 text-midRed zx:text-zxRed ${multilineTextClass} mb-1`}
        onClick={showAll}
      >
        Tap here to show all settings
      </BitmapText>
    </>
  );
};

const SelectTheKeysMenuItems = () => {
  const isScreenRelativeControl = useIsScreenRelativeControl();

  return (
    <>
      <MenuItem
        id="preset"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
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
            className={`${spriteLeaderClasses} ${
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
            className={`${spriteLeaderClasses} ${
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
            className={`${spriteLeaderClasses} ${
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
            className={`${spriteLeaderClasses} ${
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
          some puzzles require you to jump and pick up simultaneously - assign a
          key for both jump and carry
        </BitmapText>
      </div>
      <MenuItem
        id="jump"
        label="Jump"
        leader={
          <span
            className={`${spriteLeaderClasses} texture-spring.released selectedMenuItem:texture-spring.compressed`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="jump" />}
        onSelect={useDispatchActionCallback(assignInputStart, "jump")}
      />
      <MenuItem
        id="carry"
        label="Carry"
        leader={<span className={`${spriteLeaderClasses} texture-bag`} />}
        valueElement={<SelectKeysMenuAssignmentValue action="carry" />}
        onSelect={useDispatchActionCallback(assignInputStart, "carry")}
        hint={
          <BlockyMarkdown
            className="text-midGrey zx:text-zxBlack"
            markdown={`**heels only**. requires the bag`}
          />
        }
        hintInline
      />
      <MenuItem
        id="fire"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            fire dough- nuts
          </BitmapText>
        }
        leader={<span className={`${spriteLeaderClasses} texture-doughnuts`} />}
        hint={
          <BlockyMarkdown
            className="text-midGrey zx:text-zxBlack"
            markdown={`**head only**. requires the hooter`}
          />
        }
        hintInline
        valueElement={<SelectKeysMenuAssignmentValue action="fire" />}
        onSelect={useDispatchActionCallback(assignInputStart, "fire")}
      />
      <MenuItem
        id="swop"
        label="Swop"
        valueElement={<SelectKeysMenuAssignmentValue action="swop" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop")}
        hint={
          <BlockyMarkdown
            className="text-midGrey zx:text-zxBlack"
            markdown={`Like the swop key from the original game; *cycles through* the characters, Moves *in and out of symbiosis* if head is on top of heels`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} texture-blank relative overflow-hidden`}
          >
            <span
              className={`${spriteLeaderClasses} texture-head.walking.towardsRight.2 selectedMenuItem:texture-animated-head.walking.towardsRight absolute right-[50%]`}
            />
            <span
              className={`${spriteLeaderClasses} texture-heels.walking.towardsRight.2 selectedMenuItem:texture-animated-heels.walking.towardsRight absolute left-[50%]`}
            />
          </span>
        }
      />
      <MenuItem
        id="swopHead"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            Swop to head
          </BitmapText>
        }
        valueElement={<SelectKeysMenuAssignmentValue action="swop.head" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop.head")}
        hint={
          <BlockyMarkdown
            className="text-midGrey zx:text-zxBlack"
            markdown={`**shortcut**: go *directly* to *head*, avoiding cycling if in symbiosis`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} texture-head.walking.towardsRight.2 selectedMenuItem:texture-animated-head.walking.towardsRight`}
          />
        }
      />
      <MenuItem
        id="swopHeels"
        label={
          <div className={`w-6 ${multilineTextClass}`}>
            <BitmapText className={`me-1`}>Swop to</BitmapText>
            <BitmapText
              className={`text-pinkHalfbrite selectedMenuItem:text-pink`}
            >
              heels
            </BitmapText>
          </div>
        }
        valueElement={<SelectKeysMenuAssignmentValue action="swop.heels" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop.heels")}
        hint={
          <BlockyMarkdown
            className="text-midGrey zx:text-zxBlack"
            markdown={`**shortcut**: go *directly* to *heels*, avoiding cycling if in symbiosis`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} texture-heels.walking.towardsRight.2 selectedMenuItem:texture-animated-heels.walking.towardsRight`}
          />
        }
      />
      <MenuItem
        id="hold"
        // changed from hold to pause - "hold" is mistakable for carry
        label="Pause"
        valueElement={<SelectKeysMenuAssignmentValue action="hold" />}
        onSelect={useDispatchActionCallback(assignInputStart, "hold")}
      />
      <MenuItem
        id="toggleColourisation"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
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
    </>
  );
};

const controlOptionsMenuItemsClass =
  "text-metallicBlueHalfbrite zx:text-zxBlue selectedMenuItem:text-metallicBlue zx:selectedMenuItem:text-zxGreen " +
  // a lot of these menu items run multi-line, so always have a block gap between:
  "!gap-y-1 " +
  // on mobile, override the double-height of menu items (put in to give a bitter hit area) since they're big enough already
  "!sprites-normal-height";

export const ControlOptionsDialog = () => {
  useKeyAssignmentInput();

  const [showAll, setShowAll] = useState<boolean>(!isTouchDevice());
  const isAnalogueControl = useIsAnalogueControl();

  return (
    <DialogPortal>
      <Border
        className="bg-lightGrey zx:bg-zxRedDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-white zx:bg-zxWhite pr-0 !h-tallDialog !w-wideDialog max-w-widestDialog resGameboy:!w-full resGameboy:!h-full">
        <div
          className={
            "overflow-y-scroll " +
            "scrollbar  scrollbar-w-1 " +
            "scrollbar-thumb-midGrey scrollbar-track-white " +
            "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite "
          }
        >
          {isTouchDevice() && <MobileStyleBackButton className="mb-1" />}
          <BitmapText className="text-midRed zx:text-zxBlue sprites-double-height block mb-1">
            control options
          </BitmapText>

          <MenuItems className={controlOptionsMenuItemsClass}>
            <AnalogueControlMenuItem />
            <OnScreenControlsMenuItem />

            {showAll ?
              <>
                {isAnalogueControl && <ScreenRelativeControlSection />}

                <BitmapText className="text-midRed zx:text-zxBlue sprites-double-height mt-1 block col-span-3">
                  Select the keys
                </BitmapText>

                <SelectTheKeysMenuItems />
              </>
            : <>
                <ExpandToShowAll showAll={() => setShowAll(true)} />
              </>
            }
            {isTouchDevice() || <BackMenuItem />}
          </MenuItems>
        </div>
        <SelectKeysMenuFooter />
      </Dialog>
    </DialogPortal>
  );
};
