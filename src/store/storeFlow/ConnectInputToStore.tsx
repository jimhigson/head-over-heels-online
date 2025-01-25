import { useUniversalKeys } from "./useUniversalKeys";
import { useUpdateUpscaleWhenWindowResizes } from "./useUpateUpscaleWhenWIndowResizes";

export const ConnectInputToStore = () => {
  useUpdateUpscaleWhenWindowResizes();
  useUniversalKeys();
  return null;
};
