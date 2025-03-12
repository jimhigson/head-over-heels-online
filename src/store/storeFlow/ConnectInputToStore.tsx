import { useSaveGameOnUnload } from "./useSaveGameOnUnload";
import { useShowDialogWhenInPortrait } from "./useShowDialogWhenInPortrait";
import { useUniversalKeys } from "./useUniversalKeys";
import { useUpdateUpscaleWhenWindowResizes } from "./useUpateUpscaleWhenWIndowResizes";

export const ConnectInputToStore = () => {
  useUpdateUpscaleWhenWindowResizes();
  useUniversalKeys();
  useShowDialogWhenInPortrait();
  useSaveGameOnUnload();
  return null;
};
