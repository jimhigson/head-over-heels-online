import { useActionInput } from "../useActionInput";
import { MenuItemComponent } from "./MenuItemComponent";
import type { EmptyObject } from "type-fest";
import { menus } from "./menus";
import { BitmapText } from "../../Sprite";
import { twMerge } from "tailwind-merge";
import type { MenuItem } from "./MenuItem";
import type { OpenMenu } from "../../../../store/gameMenusSlice";
import {
  menuUp,
  menuDown,
  menuItemSelected,
  inputAssigned,
} from "../../../../store/gameMenusSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useMenus } from "../../../../store/selectors";
import { Dialog } from "../../../../components/ui/dialog";
import { useCallback } from "react";
import { useEvent } from "../../../../utils/react/useEvent";
import { useGameApi } from "../../GameApiContext";
import type { AssignableInput } from "../../../input/InputState";
import { componentOrElement } from "../../../../utils/react/componentOrNode";

const backMenuItem: MenuItem = {
  label: "Back",
  type: "back",
  hint: "back up to the previous menu",
};

const MenuDialogInner = ({ openMenus }: { openMenus: OpenMenu[] }) => {
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
        const assignableInput = Object.keys(inputStateEvent.inputState.raw).at(
          0,
        );
        if (assignableInput === undefined) {
          throw new Error("no assignableInput");
        }

        dispatch(inputAssigned(assignableInput as AssignableInput));
      },
      [assigningKeys, dispatch],
    ),
  );

  const [{ menuId, selectedIndex }] = openMenus;
  const menu = menus[menuId];

  const selectedItemHint = (
    selectedIndex === menu.items.length ?
      backMenuItem
    : menu.items[selectedIndex]).hint;

  return (
    <Dialog
      className={twMerge(menu.backgroundClassName, "h-zx leading-none")}
      borderClassName={menu.borderClassName}
    >
      <div>{menu.heading}</div>
      <div
        className={twMerge(
          "mt-2 grid grid-cols-menuItems gap-x-1 gap-y-oneScaledPix",
          menu.itemsClassName,
        )}
      >
        {menu.items.map((mi, i) => (
          <MenuItemComponent
            className="col-start-1"
            menu={menu}
            key={i}
            menuItem={mi}
            selected={selectedIndex === i}
          />
        ))}
        {openMenus.length > 1 && (
          <MenuItemComponent
            className="col-start-1"
            menu={menu}
            menuItem={backMenuItem}
            selected={selectedIndex === menu.items.length}
          />
        )}
      </div>
      {selectedItemHint && (
        <BitmapText
          className={twMerge(
            "block mt-1 leading-multilineText",
            menu.hintClassName,
          )}
        >
          {selectedItemHint}
        </BitmapText>
      )}
      {menu.footer && componentOrElement(menu.footer, {})}
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
