import { useActionInput } from "../useActionInput";
import type { EmptyObject } from "type-fest";
import { menus } from "./menus";
import { twMerge } from "tailwind-merge";
import type { OpenMenu } from "../../../../store/gameMenusSlice";
import {
  menuUp,
  menuDown,
  menuItemSelected,
  inputAssigned,
  doneAssigningInput,
} from "../../../../store/gameMenusSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useMenus } from "../../../../store/selectors";
import { Dialog } from "../../../../components/ui/dialog";
import { useCallback } from "react";
import { useEvent } from "../../../../utils/react/useEvent";
import { useGameApi } from "../../GameApiContext";
import { componentOrElement } from "../../../../utils/react/componentOrNode";
import { keys } from "../../../../utils/entries";

const MenuDialogInner = (props: { openMenus: OpenMenu[] }) => {
  const { openMenus } = props;
  const dispatch = useAppDispatch();
  const assigningKeys = useAppSelector(
    (store) => store.actionBeingAssignedKeys !== undefined,
  );

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

  // really just for the select input menu - dispatch keys as new assignments if
  // we are currently assigning keys
  useEvent(
    useGameApi().events,
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
          throw new Error("no assignableInput");
        }

        if (assignableInput === "Escape") dispatch(doneAssigningInput());
        else dispatch(inputAssigned(assignableInput));
      },
      [assigningKeys, dispatch],
    ),
  );

  const [{ menuId }] = openMenus;
  const menu = menus[menuId];

  return (
    <Dialog
      className={twMerge(
        menu.backgroundClassName,
        "h-zx leading-none flex flex-col gap-y-1",
      )}
      borderClassName={menu.borderClassName}
    >
      {menu.sections.map((section) => componentOrElement(section, {}))}
    </Dialog>
  );
};

export const MenuDialog = (_emptyProps: EmptyObject) => {
  const menus = useMenus();

  if (menus.length === 0) {
    return null;
  }

  return <MenuDialogInner openMenus={menus} />;
};
