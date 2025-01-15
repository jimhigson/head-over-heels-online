import { useActionInput } from "../useActionInput";
import { MenuItemComponent } from "./MenuItemComponent";
import { Dialog } from "@/components/ui/dialog";
import { useMenus } from "@/store/selectors";
import { useAppDispatch } from "@/store/hooks";
import type { EmptyObject } from "type-fest";
import type { OpenMenu } from "@/store/store";
import { menuDown, menuUp, popMenu, pushMenu } from "@/store/store";
import { menus } from "./mainMenu";

const MenuDialogInner = ({ openMenus }: { openMenus: OpenMenu[] }) => {
  const dispatch = useAppDispatch();

  useActionInput({
    action: "menu",
    onAction() {
      dispatch(popMenu());
    },
  });
  useActionInput({
    action: "away",
    onAction() {
      dispatch(menuUp());
    },
  });
  useActionInput({
    action: "towards",
    onAction() {
      dispatch(menuDown());
    },
  });
  useActionInput({
    action: "jump",
    onAction() {
      dispatch(pushMenu());
    },
  });

  const [{ menuId, selectedIndex }] = openMenus;
  const menu = menus[menuId];

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

export const MenuDialog = (_emptyProps: EmptyObject) => {
  const menus = useMenus();

  if (menus.length === 0) {
    return null;
  }

  return <MenuDialogInner openMenus={menus} />;
};
