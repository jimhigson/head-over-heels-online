import { menus } from "../game/components/dialogs/menuDialog/menus";
import { useAppSelector } from "./hooks";

export const useMenus = () => useAppSelector((state) => state.openMenus);
export const useCurrentMenu = () => {
  const openMenus = useMenus();
  if (openMenus.length === 0) return undefined;
  const [{ menuId }] = openMenus;
  const menu = menus[menuId];
  return menu;
};
export const useCurrentMenuSelectedItemIndex = () => {
  const openMenus = useMenus();
  if (openMenus.length === 0) return undefined;
  const [{ selectedIndex }] = openMenus;
  return selectedIndex;
};
