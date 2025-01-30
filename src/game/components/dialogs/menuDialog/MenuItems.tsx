import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { MenuItemComponent } from "./MenuItemComponent";
import {
  useCurrentMenu,
  useCurrentMenuSelectedItemIndex,
  useIsAssigningKeys,
} from "../../../../store/selectors";
import { useActionTap } from "../useActionInput";
import { useCallback } from "react";
import {
  menuDown,
  menuItemChosen,
  menuUp,
} from "../../../../store/gameMenusSlice";
import { store } from "../../../../store/store";
import type { BooleanAction } from "../../../input/InputState";

const useMenuNavigationInput = () => {
  const disabled = useIsAssigningKeys();

  useActionTap({
    action: "away",
    handler: useCallback(() => {
      store.dispatch(menuUp());
    }, []),
    disabled,
  });

  useActionTap({
    action: "towards",
    handler: useCallback(() => {
      store.dispatch(menuDown());
    }, []),
    disabled,
  });
  useActionTap({
    action: useMemo<BooleanAction[]>(() => ["menu_select", "jump"], []),
    handler: useCallback(() => {
      store.dispatch(menuItemChosen());
    }, []),
    disabled,
  });
};

export const MenuItems = ({ className }: { className?: string }) => {
  const menu = useCurrentMenu();
  const selectedItemIndex = useCurrentMenuSelectedItemIndex();

  if (menu === undefined || selectedItemIndex === undefined) throw new Error();

  useMenuNavigationInput();

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
            menu={menu}
            key={i}
            menuItem={mi}
            selected={isSelected}
          />
        );
      })}
    </div>
  );
};
