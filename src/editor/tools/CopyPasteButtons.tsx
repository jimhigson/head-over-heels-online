import { produce } from "immer";

import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";

import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useAppDispatch } from "../../store/hooks";
import { store } from "../../store/store";
import { pick } from "../../utils/pick";
import { selectCurrentRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import {
  roomJsonEdited,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const CopyPasteButtons = () => {
  const dispatch = useAppDispatch();

  const somethingSelected = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.selectedJsonItemIds.length > 0,
  );

  return (
    <div className="flex flex-row gap-oneScaledPix bg-metallicBlue">
      <ToolbarButton
        disabled={!somethingSelected}
        onClick={async () => {
          const storeState = (store.getState() as RootStateWithLevelEditorSlice)
            .levelEditor;

          const { selectedJsonItemIds } = storeState;
          const currentRoomJson =
            selectCurrentRoomFromLevelEditorState(storeState);

          const selectedItemMap = pick(
            currentRoomJson.items,
            ...selectedJsonItemIds,
          );

          // paste json of selectedJsonItems onto clipboard - this
          // can be pasted later into the json view
          const jsonString = JSON.stringify(selectedItemMap, null, 2);

          await navigator.clipboard.writeText(jsonString);
        }}
        shortcutKeys={["⌘C", "^C"]}
        tooltipContent={`##Copy\n\ncopy the selected item(s) to the clipboard to paste into another room`}
      >
        <IconWithTwoLineHoverText
          icon={<BitmapText>C</BitmapText>}
          topText="co"
          bottomText="py"
        />
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          try {
            // bare minimum implementation for pasting in items from other rooms:
            const clipboardText = await navigator.clipboard.readText();
            const clipboardItems = JSON.parse(clipboardText);

            const storeState = (
              store.getState() as RootStateWithLevelEditorSlice
            ).levelEditor;
            const currentRoomJson =
              selectCurrentRoomFromLevelEditorState(storeState);

            const updatedRoom = produce(currentRoomJson, (draft) => {
              Object.assign(draft.items, clipboardItems);
            });

            dispatch(roomJsonEdited(updatedRoom));
          } catch (_error) {
            // Silently ignore clipboard errors (invalid JSON, permissions, etc)
            // TODO: implement some kind of failure message
          }
        }}
        shortcutKeys={["⌘V", "^V"]}
        tooltipContent={`##Paste\n\npaste an item into this room copied from another room`}
      >
        <IconWithTwoLineHoverText
          icon={<BitmapText>P</BitmapText>}
          topText="ps"
          bottomText="te"
        />
      </ToolbarButton>
    </div>
  );
};
