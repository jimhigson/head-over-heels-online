import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks";
import type { RootState } from "./store";
import type { RenderOptions } from "@/game/RenderOptions";

export const useScaleFactor = () =>
  useAppSelector((state) => state.upscale.scaleFactor);

const renderOptionsSelector = createSelector(
  (state: RootState) => state.showBoundingBoxes,
  (state: RootState) => state.showShadowMasks,
  (state: RootState) => state.upscale,
  (showBoundingBoxes, showShadowMasks, upscale): RenderOptions => ({
    showBoundingBoxes,
    showShadowMasks,
    upscale,
  }),
);
export const useRenderOptions = () =>
  useAppSelector(renderOptionsSelector) as RenderOptions;

export const useScrollContent = () =>
  useAppSelector((state) => state.scrollContent);

export const useMenus = () => useAppSelector((state) => state.menus);

export const useIsOnHold = () => useAppSelector((state) => state.onHold);

export const useInputAssignment = () =>
  useAppSelector((state) => state.inputAssignment);
