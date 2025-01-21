import type { EmptyObject } from "type-fest";
import { menus } from "./menus";
import { twMerge } from "tailwind-merge";
import type { OpenMenu } from "../../../../store/gameMenusSlice";
import { useMenus } from "../../../../store/selectors";
import { Dialog } from "../../../../components/ui/dialog";
import { componentOrElement } from "../../../../utils/react/componentOrNode";

const MenuDialogInner = (props: { openMenus: OpenMenu[] }) => {
  const { openMenus } = props;
  const [{ menuId }] = openMenus;
  const menu = menus[menuId];

  return (
    <Dialog
      className={twMerge(
        "h-zx leading-none flex flex-col gap-y-1",
        menu.dialogClassName,
      )}
      borderClassName={menu.borderClassName}
    >
      {menu.sections.map((section, i) =>
        componentOrElement(section, { key: i }),
      )}
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
