import { useAppSelector } from "./hooks";

export const useScaleFactor = () =>
  useAppSelector((state) => state.readerOptions.upscale.scaleFactor);

export const useRenderOptions = () =>
  useAppSelector((state) => state.readerOptions);

export const useScrollContent = () =>
  useAppSelector((state) => state.scrollContent);

export const useMenus = () => useAppSelector((state) => state.menus);

export const useIsOnHold = () => useAppSelector((state) => state.onHold);

export const useInputAssignment = () =>
  useAppSelector((state) => state.inputAssignment);
