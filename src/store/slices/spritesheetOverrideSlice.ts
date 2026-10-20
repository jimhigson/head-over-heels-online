import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type SpritesheetName } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { clearAllData } from "./clearAllData";

type SpritesheetOverrideState = {
  overrides: Partial<Record<SpritesheetName, string>>;
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
        payload: { spritesheetArtName, dataUrl },
      }: PayloadAction<{
        spritesheetArtName: SpritesheetName;
        dataUrl: string;
      }>,
    ) {
      state.overrides[spritesheetArtName] = dataUrl;
    },
    clearSpritesheetOverride(
      state,
      { payload: spritesheetArtName }: PayloadAction<SpritesheetName>,
    ) {
      delete state.overrides[spritesheetArtName];
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialState);
  },
  selectors: {
    selectSpritesheetOverrideDataUrl: (
      state,
      spritesheetArtName: SpritesheetName,
    ): string | undefined => state.overrides[spritesheetArtName],
    selectIsSpritesheetOverridden: (
      state,
      spritesheetArtName: SpritesheetName,
    ): boolean => spritesheetArtName in state.overrides,
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
  if (cached) {
    return cached;
  }
  const [header, base64] = dataUrl.split(",");
  const type = header.slice(header.indexOf(":") + 1, header.indexOf(";"));
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blobUrl = URL.createObjectURL(new Blob([bytes], { type }));
  blobUrlCache.set(dataUrl, blobUrl);
  return blobUrl;
};

export const selectSpritesheetOverrideBlobUrl = (
  ...args: Parameters<typeof selectSpritesheetOverrideDataUrl>
): string | undefined => {
  const dataUrl = selectSpritesheetOverrideDataUrl(...args);
  return dataUrl !== undefined ? dataUrlToBlobUrl(dataUrl) : undefined;
};
