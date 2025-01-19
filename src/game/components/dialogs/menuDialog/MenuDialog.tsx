import { useActionInput } from "../useActionInput";
import { MenuItemComponent } from "./MenuItemComponent";
import { Dialog } from "@/components/ui/dialog";
import { useMenus } from "@/store/selectors";
import { useAppDispatch } from "@/store/hooks";
import type { EmptyObject } from "type-fest";
import { menuDown, menuUp, menuItemSelected } from "@/store/gameMenusSlice";
import { menus } from "./menus";
import { BitmapText } from "../../Sprite";
import type { OpenMenu } from "@/store/gameMenusSlice";
import { twMerge } from "tailwind-merge";
import type { MenuItem } from "./MenuItem";

const backMenuItem: MenuItem = {
  label: "Back",
  type: "back",
  hint: "back up to the previous menu",
};

const MenuDialogInner = ({ openMenus }: { openMenus: OpenMenu[] }) => {
  const dispatch = useAppDispatch();

  useActionInput({
    action: "away",
    key: ["ArrowUp"],
    onAction() {
      dispatch(menuUp());
    },
  });
  useActionInput({
    action: "towards",
    key: ["ArrowDown"],
    onAction() {
      dispatch(menuDown());
    },
  });
  useActionInput({
    action: "jump",
    key: ["Enter", " ", "ArrowRight"],
    onAction() {
      dispatch(menuItemSelected());
    },
  });

  const [{ menuId, selectedIndex }] = openMenus;
  const menu = menus[menuId];

  const selectedItemHint = (
    selectedIndex === menu.items.length ?
      backMenuItem
    : menu.items[selectedIndex]).hint;

  return (
    <Dialog className={twMerge(menu.backgroundClassName, "h-zx leading-none")}>
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
      {menu.footer && <div className="mt-1">{menu.footer}</div>}
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
