import { twMerge } from "tailwind-merge";
import { MenuItemComponent } from "./MenuItemComponent";
import {
  useCurrentMenu,
  useCurrentMenuSelectedItemIndex,
} from "../../../../store/selectors";
import { useActionInput } from "../useActionInput";
import { useCallback } from "react";
import {
  menuUp,
  menuDown,
  menuItemSelected,
  doneAssigningInput,
  inputAssigned,
} from "../../../../store/gameMenusSlice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { useEvent } from "../../../../utils/react/useEvent";
import { keys } from "../../../../utils/entries";
import { useInputState } from "../../../input/InputStateProvider";

export const MenuItems = ({
  className,
  selectedClassName,
}: {
  className?: string;
  selectedClassName?: string;
}) => {
  const menu = useCurrentMenu();
  const selectedItemIndex = useCurrentMenuSelectedItemIndex();

  const assigningKeys = useAppSelector(
    (store) => store.actionBeingAssignedKeys !== undefined,
  );
  const dispatch = useAppDispatch();
  if (menu === undefined || selectedItemIndex === undefined) throw new Error();

  useActionInput({
    action: "away",
    key: ["ArrowUp"],
    onAction: useCallback(() => {
      dispatch(menuUp());
    }, [dispatch]),
    disabled: assigningKeys,
  });
  useActionInput({
    action: "towards",
    key: ["ArrowDown"],
    onAction: useCallback(() => {
      dispatch(menuDown());
    }, [dispatch]),
    disabled: assigningKeys,
  });
  useActionInput({
    action: "jump",
    key: ["Enter", " ", "ArrowRight"],
    onAction: useCallback(() => {
      dispatch(menuItemSelected());
    }, [dispatch]),
    disabled: assigningKeys,
  });

  // really just for the select they keys menu - dispatch keys as new assignments if
  // we are currently assigning keys
  useEvent(
    useInputState().events,
    "inputStateChanged",
    useCallback(
      (inputStateEvent) => {
        if (!assigningKeys) {
          return;
        }
        if (inputStateEvent.upOrDown !== "down") {
          return;
        }
        const assignableInput = keys(inputStateEvent.inputState.raw).at(0);
        if (assignableInput === undefined) {
          throw new Error(
            "no assignableInput: inputStateEvent.inputState.raw seems to be empty",
          );
        }

        if (assignableInput === "Escape") dispatch(doneAssigningInput());
        else dispatch(inputAssigned(assignableInput));
      },
      [assigningKeys, dispatch],
    ),
  );

  return (
    <div
      className={twMerge(
        "grid grid-cols-menuItems gap-x-1 gap-y-oneScaledPix",
        className,
      )}
    >
      {menu.items.map((mi, i) => {
        const isSelected = i === selectedItemIndex;
        return (
          <MenuItemComponent
            className={isSelected ? selectedClassName : ""}
            key={i}
            menuItem={mi}
            selected={isSelected}
          />
        );
      })}
    </div>
  );
};
