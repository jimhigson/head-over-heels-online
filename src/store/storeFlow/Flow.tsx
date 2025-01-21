import { useGiveStoreKeyAssignmentToGame } from "./useGiveStoreKeyAssignmentToGame";
import { useGiveStoreRenderOptionsToGame } from "./useGiveStoreRenderOptionsToGame";
import { useGoOnHold } from "./useGoOnHold";
import { useOpenMainMenu } from "./useOpenMainMenu";
import { useUpdateUpscaleWhenWindowResizes } from "./useUpateUpscaleWhenWIndowResizes";
import { useZeroGameSpeedWhenDialogsOpen } from "./useZeroGamespeedWhenDialogsOpen";

export const Flow = () => {
  useGoOnHold();
  useUpdateUpscaleWhenWindowResizes();
  useOpenMainMenu();
  useZeroGameSpeedWhenDialogsOpen();
  useGiveStoreRenderOptionsToGame();
  useGiveStoreKeyAssignmentToGame();
  return null;
};
