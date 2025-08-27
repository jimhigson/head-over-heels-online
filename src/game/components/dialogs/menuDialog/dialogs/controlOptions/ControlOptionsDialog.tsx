import { useCallback, useState } from "react";

import {
  selectIsAssigningKeys,
  useInputDirectionMode,
  useIsAssigningKeys,
} from "../../../../../../store/selectors";
import {
  backToParentMenu,
  doneAssigningInput,
  inputAddedDuringAssignment,
} from "../../../../../../store/slices/gameMenusSlice";
import { store } from "../../../../../../store/store";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { useActionTap, useInputTap } from "../../../useActionTap";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { InputDirectionModeMenuItem } from "./InputDirectionModeMenuItem";
import { OnScreenControlsMenuItem } from "./OnScreenControlsMenuItem";
import {
  optionsMenuItemColours,
  optionsMenuScrollClasses,
} from "./optionsMenuColours";
import { ScreenRelativeControlMenuItem } from "./ScreenRelativeControlSection";
import { SelectKeysMenuFooter } from "./SelectKeysMenuFooter";
import { SelectTheKeysMenuItems } from "./SelectTheKeysMenuItems";

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

const ExpandToShowAll = ({ showAll }: { showAll: () => void }) => {
  return (
    <div className="text-metallicBlueHalfbrite zx:text-zxBlue">
      <BitmapText className={`block mb-1 ${multilineTextClass}`}>
        Detected that you are on a phone or tablet
      </BitmapText>
      <BitmapText className={`block mb-1 ${multilineTextClass}`}>
        Additional settings for keys and gamepad buttons are designed for
        desktop/laptops, but you can use them on phones/tablets if you have a
        keyboard or gamepad connected
      </BitmapText>
      <BitmapText
        className={`block mb-1 text-midRed zx:text-zxRed ${multilineTextClass} mb-1`}
        onClick={showAll}
      >
        Tap here to show all settings
      </BitmapText>
    </div>
  );
};

const controlOptionsMenuItemsClass =
  optionsMenuItemColours +
  " " +
  // a lot of these menu items run multi-line, so always have a block gap between:
  "!gap-y-1 " +
  // on mobile, override the double-height of menu items (put in to give a bitter hit area) since they're big enough already
  "!sprites-normal-height";

export const ControlOptionsDialog = () => {
  useKeyAssignmentInput();

  const [showAll, setShowAll] = useState<boolean>(!isTouchDevice());
  const inputDirectionMode = useInputDirectionMode();

  return (
    <DialogPortal>
      <Border
        className="bg-lightGrey zx:bg-zxRedDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog tall wide className="bg-white zx:bg-zxWhite pr-0 pl-1">
        <div
          className={
            "flex flex-col gap-y-1 " +
            "overflow-y-scroll " +
            "scrollbar  scrollbar-w-1 " +
            optionsMenuScrollClasses
          }
        >
          {isTouchDevice() && <MobileStyleBackButton className="mb-1" />}
          <BitmapText
            TagName="h1"
            className="text-midRed zx:text-zxBlue sprites-double-height block"
          >
            control options
          </BitmapText>

          <MenuItems className={controlOptionsMenuItemsClass}>
            <InputDirectionModeMenuItem />
            <OnScreenControlsMenuItem />
            {inputDirectionMode !== "4-way" && showAll && (
              <ScreenRelativeControlMenuItem />
            )}
          </MenuItems>

          {showAll ?
            <>
              <BitmapText
                TagName="h1"
                className="text-midRed zx:text-zxBlue sprites-double-height mt-1 block col-span-3"
              >
                Select the keys
              </BitmapText>
              <MenuItems className={controlOptionsMenuItemsClass}>
                <SelectTheKeysMenuItems />
                {isTouchDevice() || <BackMenuItem />}
              </MenuItems>
            </>
          : <>
              <ExpandToShowAll showAll={() => setShowAll(true)} />
            </>
          }
        </div>
        <SelectKeysMenuFooter />
      </Dialog>
    </DialogPortal>
  );
};
