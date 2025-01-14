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

const defaultMenus = [mainMenu];
export const MenuDialog = <RoomId extends string>({
  onClose,
  gameApi,
}: MenuDialogContentProps<RoomId>) => {
  const [curMenus, setCurMenus] = useState<Menu[]>(defaultMenus);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useActionInput({
    action: "menu",
    onAction() {
      if (curMenus.length === 1) {
        onClose();
      } else {
        setCurMenus(([_head, ...tail]) => tail);
        setSelectedItemIndex(0);
      }
    },
    gameApi,
  });
  useActionInput({
    action: "away",
    onAction() {
      setSelectedItemIndex((i) => {
        const [curMenu] = curMenus;
        return (i - 1 + curMenu.items.length) % curMenu.items.length;
      });
    },
    gameApi,
  });
  useActionInput({
    action: "towards",
    onAction() {
      const [curMenu] = curMenus;
      setSelectedItemIndex((i) => (i + 1) % curMenu.items.length);
    },
    gameApi,
  });
  useActionInput({
    action: "jump",
    onAction() {
      const [curMenu] = curMenus;
      const selectedMenuItem = curMenu.items[selectedItemIndex];
      switch (selectedMenuItem.type) {
        case "submenu":
          setCurMenus((cm) => [selectedMenuItem.submenu, ...cm]);
          setSelectedItemIndex(0);
          break;
        case "toGame":
          onClose();
          break;
      }
    },
    gameApi,
  });

  const [curMenu] = curMenus;

  return (
    <Dialog className={`bg-${curMenu.background} h-zx`}>
      <div>{curMenu.heading}</div>
      <div className="mt-2 leading-blockPlusOne">
        {curMenu.items.map((mi, i) => (
          <MenuItemComponent
            menu={curMenu}
            key={mi.label}
            menuItem={mi}
            selected={selectedItemIndex === i}
          />
        ))}
      </div>
    </Dialog>
  );
};
