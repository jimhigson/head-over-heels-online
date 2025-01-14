import type { GameApi } from "@/game/GameApi";
import { useState } from "react";
import { useActionInput } from "../useActionInput";
import { MenuItemComponent } from "./MenuItemComponent";
import { Dialog } from "@/components/ui/dialog";
import { mainMenu, type Menu } from "./mainMenu";

export interface MenuDialogContentProps<RoomId extends string> {
  gameApi: GameApi<RoomId>;
  /** callback for when this dialog wants to close itself */
  onClose: () => void;
}

const defaultMenus = [{ menu: mainMenu, selectedIndex: 0 }];
export const MenuDialog = <RoomId extends string>({
  onClose,
  gameApi,
}: MenuDialogContentProps<RoomId>) => {
  const [curMenus, setCurMenus] = useState<
    {
      menu: Menu;
      selectedIndex: number;
    }[]
  >(defaultMenus);

  useActionInput({
    action: "menu",
    onAction() {
      // go back up a menu:
      if (curMenus.length === 1) {
        onClose();
      } else {
        setCurMenus(([_head, ...tail]) => tail);
      }
    },
    gameApi,
  });
  useActionInput({
    action: "away",
    onAction() {
      setCurMenus(([{ selectedIndex, menu }, ...tail]) => {
        return [
          {
            selectedIndex:
              (selectedIndex - 1 + menu.items.length) % menu.items.length,
            menu,
          },
          ...tail,
        ];
      });
    },
    gameApi,
  });
  useActionInput({
    action: "towards",
    onAction() {
      setCurMenus(([{ selectedIndex, menu }, ...tail]) => {
        return [
          {
            selectedIndex: (selectedIndex + 1) % menu.items.length,
            menu,
          },
          ...tail,
        ];
      });
    },
    gameApi,
  });
  useActionInput({
    action: "jump",
    onAction() {
      const [{ menu, selectedIndex }] = curMenus;
      const selectedMenuItem = menu.items[selectedIndex];
      switch (selectedMenuItem.type) {
        case "submenu":
          setCurMenus((cm) => [
            { menu: selectedMenuItem.submenu, selectedIndex: 0 },
            ...cm,
          ]);
          break;
        case "toGame":
          onClose();
          break;
      }
    },
    gameApi,
  });

  const [{ menu, selectedIndex }] = curMenus;

  return (
    <Dialog className={`bg-${menu.background} h-zx`}>
      <div>{menu.heading}</div>
      <div className="mt-2 leading-blockPlusOne">
        {menu.items.map((mi, i) => (
          <MenuItemComponent
            menu={menu}
            key={mi.label}
            menuItem={mi}
            selected={selectedIndex === i}
          />
        ))}
      </div>
      {menu.footer && <div className="mt-1">{menu.footer}</div>}
    </Dialog>
  );
};
