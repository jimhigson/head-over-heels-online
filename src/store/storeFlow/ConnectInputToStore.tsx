import { useUpdateUpscaleWhenElementResizes } from "../slices/upscale/useUpdateUpscaleWhenElementResizes";
import { useSaveGameOnUnload } from "./useSaveGameOnUnload";
import { useUniversalKeys } from "./useUniversalKeys";

export const ConnectInputToStore = () => {
  useUpdateUpscaleWhenElementResizes();
  useUniversalKeys();
  useSaveGameOnUnload();
  return null;
};
