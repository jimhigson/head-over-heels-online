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

export const useScrollContent = () =>
  useAppSelector((state) => state.scrollContent);

export const useMenus = () => useAppSelector((state) => state.menus);

export const useIsOnHold = () => useAppSelector((state) => state.onHold);

export const useInputAssignment = () =>
  useAppSelector((state) => state.inputAssignment);
