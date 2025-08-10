import { useSaveGameOnUnload } from "./useSaveGameOnUnload";
import { useUniversalKeys } from "./useUniversalKeys";
import { useUpdateUpscaleWhenElementResizes } from "./useUpateUpscaleWhenElementResizes";

export const ConnectInputToStore = () => {
  useUpdateUpscaleWhenElementResizes();
  useUniversalKeys();
  useSaveGameOnUnload();
  return null;
};
