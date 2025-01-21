import { menus } from "../game/components/dialogs/menuDialog/menus";
import { useAppSelector } from "./hooks";

export const useTotalUpscale = () =>
  useAppSelector((state) => {
    const {
      renderOptions: {
        upscale: { cssUpscale, gameEngineUpscale },
      },
    } = state;
    return cssUpscale * gameEngineUpscale;
  });

export const useRenderOptions = () =>
  useAppSelector((state) => state.renderOptions);

export const useMenus = () => useAppSelector((state) => state.menus);
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

export const useIsOnHold = () => useAppSelector((state) => state.onHold);

export const useInputAssignment = () =>
  useAppSelector((state) => state.inputAssignment);
