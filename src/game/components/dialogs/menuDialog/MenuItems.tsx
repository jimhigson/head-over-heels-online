import { twMerge } from "tailwind-merge";
import { MenuItemComponent } from "./MenuItemComponent";
import {
  useCurrentMenu,
  useCurrentMenuSelectedItemIndex,
  useIsAssigningKeys,
} from "../../../../store/selectors";
import { useActionInput } from "../useActionInput";
import { useCallback, useMemo } from "react";
import {
  menuUp,
  menuItemChosen,
  menuDown,
} from "../../../../store/gameMenusSlice";
import { store } from "../../../../store/store";
import type { BooleanAction } from "../../../input/InputState";

const useMenuNavigationInput = () => {
  const disabled = useIsAssigningKeys();

  useActionInput({
    action: "away",
    onAction: useCallback(() => {
      store.dispatch(menuUp());
    }, []),
    disabled,
  });

  useActionInput({
    action: "towards",
    onAction: useCallback(() => {
      store.dispatch(menuDown());
    }, []),
    disabled,
  });
  useActionInput({
    action: useMemo<BooleanAction[]>(() => ["menu_select", "jump"], []),
    onAction: useCallback(() => {
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
