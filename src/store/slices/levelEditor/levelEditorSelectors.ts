import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import type { EditorRoomJson } from "./EditorRoomId";

const selectorHook = <T>(selector: (state: RootState) => T) => {
  const useThiSelector = () => {
    return useAppSelector(selector);
  };
  return useThiSelector;
};

export const selectCurrentEditingLevelJson = (state: RootState) =>
  state.levelEditor.campaignInProgress.rooms[
    state.levelEditor.currentlyEditingRoom
  ] as EditorRoomJson;

export const useCurrentEditingLevelJson = selectorHook(
  selectCurrentEditingLevelJson,
);
