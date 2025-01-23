import { useGoOnHold } from "./useGoOnHold";
import { useOpenMainMenu } from "./useOpenMainMenu";
import { useUpdateUpscaleWhenWindowResizes } from "./useUpateUpscaleWhenWIndowResizes";

export const Flow = () => {
  useGoOnHold();
  useUpdateUpscaleWhenWindowResizes();
  useOpenMainMenu();
  return null;
};
