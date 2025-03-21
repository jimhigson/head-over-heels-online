import { useSaveGameOnUnload } from "./useSaveGameOnUnload";
import { useUniversalKeys } from "./useUniversalKeys";
import { useUpdateUpscaleWhenWindowResizes } from "./useUpateUpscaleWhenWIndowResizes";

export const ConnectInputToStore = () => {
  useUpdateUpscaleWhenWindowResizes();
  useUniversalKeys();
  useSaveGameOnUnload();
  return null;
};
