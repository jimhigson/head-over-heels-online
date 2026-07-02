import { useHoldOnWindowHidden } from "./useHoldOnWindowHidden";
import { useSaveGameOnUnload } from "./useSaveGameOnUnload";
import { useUniversalKeys } from "./useUniversalKeys";

export const ConnectInputToStore = () => {
  useUniversalKeys();
  useHoldOnWindowHidden();
  useSaveGameOnUnload();
  return null;
};
