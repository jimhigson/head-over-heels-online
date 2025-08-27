import { useMemo } from "react";

import type { MapData } from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import type {
  CharacterRooms,
  PickupsCollected,
} from "../../game/gameState/GameState";
import type { EditorRoomId } from "../editorTypes";

import { findMapBounds } from "../../game/components/dialogs/menuDialog/dialogs/map/findMapBounds";
import { roomGridPositions } from "../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { sortRoomGridPositions } from "../../game/components/dialogs/menuDialog/dialogs/map/sortRoomGridPositions";
import { emptyObject } from "../../utils/empty";
import {
  selectCurrentEditingRoomJson,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const useEditorMapData = (): MapData<EditorRoomId> | undefined => {
  const campaign = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.campaignInProgress,
  );
  const curRoomSubroom = useAppSelectorWithLevelEditorSlice((state) => {
    const roomJson = selectCurrentEditingRoomJson(state);
    const subRooms = roomJson.meta?.subRooms;
    // find any sub-room for the current room:
    return (subRooms && Object.keys(subRooms)[0]) ?? "*";
  });
  const curRoomScenery = useAppSelectorWithLevelEditorSlice((state) => {
    const roomJson = selectCurrentEditingRoomJson(state);
    return roomJson.planet;
  });
  const curRoomEditingRoomId = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.currentlyEditingRoomId,
  );

  return useMemo(() => {
    try {
      const positions = [
        ...roomGridPositions({
          campaign,
          roomId: curRoomEditingRoomId,
          subRoomId: curRoomSubroom,
        }),
      ];
      const sortedObjectOfPositions = sortRoomGridPositions(positions);

      return {
        mapBounds: findMapBounds(positions),
        curRoomId: curRoomEditingRoomId,
        gridPositions: sortedObjectOfPositions,
        // TODO: not sure if this applies for the editor, maybe should be optional
        currentCharacterName: "head",
        pickupsCollected: emptyObject as PickupsCollected<EditorRoomId>,
        characterRooms: emptyObject as CharacterRooms<EditorRoomId>,
        campaign,
        roomsExplored: emptyObject as Record<EditorRoomId, true>,
        curRoomScenery,
      };
    } catch (e) {
      console.error(Error("error getting map data", { cause: e }));
      // since this is the level editor, we're expecting the campaign to be invalid
      // sometimes - so instead of throwing an error, we just return undefined so the component
      // can decide not to render until we are valid again
      return undefined;
    }
  }, [campaign, curRoomEditingRoomId, curRoomScenery, curRoomSubroom]);
};
