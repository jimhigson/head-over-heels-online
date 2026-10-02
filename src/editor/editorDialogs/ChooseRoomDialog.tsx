import { useCallback, useMemo, useState } from "preact/hooks";

import { createClickableRoomBehaviour } from "../../game/components/dialogs/menuDialog/dialogs/map/createClickableRoomBehaviour";
import { MapSvg } from "../../game/components/dialogs/menuDialog/dialogs/map/Map.svg";
import { Border } from "../../ui/Border";
import { Button } from "../../ui/Button";
import { Dialog } from "../../ui/Dialog";
import { DialogHeader } from "../../ui/DialogHeader";
import { DialogPortal } from "../../ui/DialogPortal";
import { RoomSelect } from "../../ui/RoomSelect";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";
import { useElementSize } from "../../utils/preact/useElementSize";
import { mapAreaIndexOfRoom } from "../EditorMap/mapAreaIndexOfRoom";
import { MapAreaSwitcher } from "../EditorMap/MapAreaSwitcher";
import { editorMapAreas, editorMapData } from "../EditorMap/useEditorMapData";
import { type EditorCampaign, type EditorRoomId } from "../editorTypes";
import { firstSubRoomId } from "../slice/inPlaceMutators/changeCurrentRoomInPlace";

export type ChooseRoomDialogProps = {
  heading: string;
  campaign: EditorCampaign;
  /** the room chosen when the dialog opens, if any */
  initialRoomId: EditorRoomId | undefined;
  /** marked as the current room; its area is shown unless one is chosen */
  mapRoomId: EditorRoomId;
  /** the choose button's text, given the room chosen so far */
  chooseText: (roomId: EditorRoomId | undefined) => string;
  onChoose: (roomId: EditorRoomId) => void;
  onCancel: () => void;
};

/** the map with the given room as current, recomputed only when either changes */
const useMapDataForRoom = (campaign: EditorCampaign, roomId: EditorRoomId) =>
  useMemo(
    () =>
      editorMapData(
        campaign,
        editorMapAreas(campaign),
        roomId,
        firstSubRoomId(campaign.rooms[roomId]),
      ),
    [campaign, roomId],
  );

/** a map behaviour that makes clicking a room choose it */
const useChooseOnClickBehaviours = (
  chooseRoom: (roomId: EditorRoomId) => void,
) =>
  useMemo(
    () => [
      createClickableRoomBehaviour<EditorRoomId>((roomId) =>
        chooseRoom(roomId),
      ),
    ],
    [chooseRoom],
  );

/**
 * pick a room, either from a searchable list or by clicking it on the map.
 * Nothing is chosen until the choose button is pressed
 */
export const ChooseRoomDialog = ({
  heading,
  campaign,
  initialRoomId,
  mapRoomId,
  chooseText,
  onChoose,
  onCancel,
}: ChooseRoomDialogProps) => {
  const [chosenRoomId, setChosenRoomId] = useState(initialRoomId);
  // any room of the area the map shows:
  const [shownAreaRoomId, setShownAreaRoomId] = useState(
    initialRoomId ?? mapRoomId,
  );
  const chooseRoom = useCallback((roomId: EditorRoomId) => {
    setChosenRoomId(roomId);
    setShownAreaRoomId(roomId);
  }, []);
  const [dialogEl, setDialogEl] = useState<HTMLDialogElement | null>(null);
  const dialogRef = useCallback((el: HTMLDialogElement | null) => {
    setDialogEl(el);
    el?.focus();
  }, []);
  const {
    ref: mapContainerRef,
    width: mapContainerWidth,
    height: mapContainerHeight,
  } = useElementSize<HTMLDivElement>();

  const mapData = useMapDataForRoom(campaign, mapRoomId);
  const behaviours = useChooseOnClickBehaviours(chooseRoom);
  const shownAreaIndex =
    mapData.isError ? 0 : mapAreaIndexOfRoom(mapData.areas, shownAreaRoomId);

  useKeyboardShortcut(["Escape"], false, onCancel, dialogEl);

  return (
    <DialogPortal>
      {/* at dialog z index, so it also covers any dialog this was opened over: */}
      <Border class="scale-editor !z-dialog" scrim />
      <div class="contents no-keyboard-shortcuts">
        <Dialog
          ref={dialogRef}
          tall
          wide
          class="scale-editor p-1 flex flex-col gap-1"
        >
          <DialogHeader>{heading}</DialogHeader>
          <RoomSelect<EditorRoomId>
            campaign={campaign}
            value={chosenRoomId}
            onSelect={chooseRoom}
          />
          <div class="relative flex-1 min-h-0">
            <div
              class="h-full overflow-y-auto bg-editor-checkerboard scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue"
              ref={mapContainerRef}
            >
              {mapData.isError ?
                <span class="text-multi-line text-lightGrey">
                  {`Could not draw the map:\n${mapData.errors.join("\n")}`}
                </span>
              : mapContainerHeight !== 0 && (
                  <MapSvg<EditorRoomId>
                    containerWidth={mapContainerWidth}
                    behaviours={behaviours}
                    selectedRoomIds={
                      chosenRoomId === undefined ? [] : [chosenRoomId]
                    }
                    {...mapData}
                    areaIndex={shownAreaIndex}
                  />
                )
              }
            </div>
            {!mapData.isError && (
              <MapAreaSwitcher
                areas={mapData.areas}
                shownAreaIndex={shownAreaIndex}
                onSwitchToRoom={setShownAreaRoomId}
              />
            )}
          </div>
          <div class="flex gap-1 justify-end text-white items-center">
            <Button
              aria-label="Cancel"
              onClick={onCancel}
              class="px-1 py-half self-stretch"
            >
              <span class="text-single-line">Cancel</span>
            </Button>
            <Button
              aria-label={chooseText(chosenRoomId)}
              onClick={() => {
                if (chosenRoomId !== undefined) {
                  onChoose(chosenRoomId);
                }
              }}
              disabled={chosenRoomId === undefined}
              class="bg-midRed px-1 py-half"
            >
              <span class="text-single-line">{chooseText(chosenRoomId)}</span>
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
