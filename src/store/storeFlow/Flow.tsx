import { useGoOnHold } from "./useGoOnHold";
import { useOpenMainMenu } from "./useOpenMainMenu";
import { useOpenScrolls } from "./useOpenScrolls";
import { useUpdateUpscaleWhenWindowResizes } from "./useUpateUpscaleWhenWIndowResizes";
import { useZeroGameSpeedWhenDialogsOpen } from "./useZeroGamespeedWhenDialogsOpen";

export const Flow = () => {
  useGoOnHold();
  useOpenScrolls();
  useUpdateUpscaleWhenWindowResizes();
  useOpenMainMenu();
  useZeroGameSpeedWhenDialogsOpen();
  return null;
};
