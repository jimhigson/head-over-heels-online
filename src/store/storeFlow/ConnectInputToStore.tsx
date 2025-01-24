import { useGoOnHold } from "./useGoOnHold";
import { useMenuPressed } from "./useMenuPressed";
import { useUpdateUpscaleWhenWindowResizes } from "./useUpateUpscaleWhenWIndowResizes";

export const ConnectInputToStore = () => {
  useGoOnHold();
  useUpdateUpscaleWhenWindowResizes();
  useMenuPressed();
  return null;
};
