import { useUpdateUpscaleOnDisplaySettingsChange } from "../slices/upscale/useUpdateUpscaleOnDisplaySettingsChange";
import { useUpdateUpscaleWhenElementResizes } from "../slices/upscale/useUpdateUpscaleWhenElementResizes";
import { useHoldOnWindowHidden } from "./useHoldOnWindowHidden";
import { useSaveGameOnUnload } from "./useSaveGameOnUnload";
import { useUniversalKeys } from "./useUniversalKeys";

export const ConnectInputToStore = () => {
  useUpdateUpscaleWhenElementResizes();
  useUpdateUpscaleOnDisplaySettingsChange();
  useUniversalKeys();
  useHoldOnWindowHidden();
  useSaveGameOnUnload();
  return null;
};
