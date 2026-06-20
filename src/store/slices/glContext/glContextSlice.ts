import { createSlice } from "@reduxjs/toolkit";

import { clearAllData } from "../clearAllData";

export type GlContextState = {
  /**
   * incremented each time the WebGL context is lost. Used as a React `key`
   * on the game render area so a context loss tears down and remounts the
   * whole pixi Application (and its spritesheet variants) on a fresh canvas.
   * Every runtime-baked RenderTexture is then regenerated from scratch during
   * construction - something a same-canvas restore cannot reliably do, since
   * those textures have no cpu-side resource to restore from.
   */
  generation: number;
};

const initialState: GlContextState = {
  generation: 0,
};

/**
 * Tracks WebGL context losses. A loss invalidates every gpu-resident
 * resource, so rather than rebuild in place we bump a generation counter and
 * let the React layer remount the game area keyed on it.
 */
export const glContextSlice = createSlice({
  name: "glContext",
  initialState,
  reducers: {
    glContextLost(state) {
      state.generation++;
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialState);
  },
  selectors: {
    selectGlContextGeneration(state: GlContextState) {
      return state.generation;
    },
  },
});

export const { glContextLost } = glContextSlice.actions;
export const { selectGlContextGeneration } = glContextSlice.selectors;
