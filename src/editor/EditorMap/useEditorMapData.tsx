import { useMemo } from "preact/hooks";

import { findMapBounds } from "../../game/components/dialogs/menuDialog/dialogs/map/findMapBounds";
import {
  type MapData,
  type MapDataError,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import { roomGridPositions } from "../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { sortRoomGridPositions } from "../../game/components/dialogs/menuDialog/dialogs/map/sortRoomGridPositions";
import {
  type CharacterRooms,
  type PickupsCollected,
} from "../../game/gameState/GameState";
import { useEditorAppSelector } from "../../store/store";
import { emptyObject } from "../../utils/empty";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { type EditorRoomId } from "../editorTypes";
import { selectCurrentEditingRoomJson } from "../slice/levelEditorSlice";

export const useEditorMapData = (): MapData<EditorRoomId> | MapDataError => {
  const campaign = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress,
  );

  const curRoomScenery = useEditorAppSelector((state) => {
    const roomJson = selectCurrentEditingRoomJson(state);
    return roomJson.planet;
  });
  const { roomId: curRoomEditingRoomId, subRoomId: curRoomSubroom } =
    useEditorAppSelector((state) => state.levelEditor.currentlyEditing);

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
        curSubRoomId: curRoomSubroom,
        gridPositions: sortedObjectOfPositions,
        // TODO: not sure if this applies for the editor, maybe should be optional
        currentCharacterName: "head",
        pickupsCollected: emptyObject as PickupsCollected<EditorRoomId>,
        characterRooms: emptyObject as CharacterRooms<EditorRoomId>,
        campaign,
        roomsExplored: emptyObject as Record<EditorRoomId, true>,
        curRoomScenery,
        isError: false,
      };
    } catch (e) {
      console.error(Error("error getting map data", { cause: e }));
      const errors = createSerialisableErrors(e)
        .map((err) => err.message)
        .reverse();
      return { isError: true, errors };
    }
  }, [campaign, curRoomEditingRoomId, curRoomScenery, curRoomSubroom]);
};
