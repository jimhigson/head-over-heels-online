import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { LoadableSpriteOption } from "../../sprites/spritesheet/loadedSpriteSheet";

type SpritesheetOverrideState = {
  overrides: Partial<Record<LoadableSpriteOption, string>>;
};

const initialState: SpritesheetOverrideState = {
  overrides: {},
};

export const spritesheetOverrideSlice = createSlice({
  name: "spritesheetOverride",
  initialState,
  reducers: {
    setSpritesheetOverride(
      state,
      {
        payload: { spriteOption, dataUrl },
      }: PayloadAction<{ spriteOption: LoadableSpriteOption; dataUrl: string }>,
    ) {
      state.overrides[spriteOption] = dataUrl;
    },
    clearSpritesheetOverride(
      state,
      { payload: spriteOption }: PayloadAction<LoadableSpriteOption>,
    ) {
      delete state.overrides[spriteOption];
    },
  },
  selectors: {
    selectSpritesheetOverrideDataUrl: (
      state,
      spriteOption: LoadableSpriteOption,
    ): string | undefined => state.overrides[spriteOption],
    selectIsSpritesheetOverridden: (
      state,
      spriteOption: LoadableSpriteOption,
    ): boolean => spriteOption in state.overrides,
  },
});

export const { setSpritesheetOverride, clearSpritesheetOverride } =
  spritesheetOverrideSlice.actions;

export const {
  selectSpritesheetOverrideDataUrl,
  selectIsSpritesheetOverridden,
} = spritesheetOverrideSlice.selectors;

// map from data url to blob url
const blobUrlCache = new Map<string, string>();

const dataUrlToBlobUrl = (dataUrl: string): string => {
  const cached = blobUrlCache.get(dataUrl);
  if (cached) return cached;
  const binary = atob(dataUrl.split(",")[1]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blobUrl = URL.createObjectURL(new Blob([bytes], { type: "image/png" }));
  blobUrlCache.set(dataUrl, blobUrl);
  return blobUrl;
};

export const selectSpritesheetOverrideBlobUrl = (
  ...args: Parameters<typeof selectSpritesheetOverrideDataUrl>
): string | undefined => {
  const dataUrl = selectSpritesheetOverrideDataUrl(...args);
  return dataUrl !== undefined ? dataUrlToBlobUrl(dataUrl) : undefined;
};
