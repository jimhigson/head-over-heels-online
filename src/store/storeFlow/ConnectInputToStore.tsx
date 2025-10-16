import { useUpdateUpscaleWhenElementResizes } from "../slices/upscale/useUpdateUpscaleWhenElementResizes";
import { useHoldOnWindowHidden } from "./useHoldOnWindowHidden";
import { useSaveGameOnUnload } from "./useSaveGameOnUnload";
import { useUniversalKeys } from "./useUniversalKeys";

export const ConnectInputToStore = () => {
  useUpdateUpscaleWhenElementResizes();
  useUniversalKeys();
  useHoldOnWindowHidden();
  useSaveGameOnUnload();
  return null;
};
