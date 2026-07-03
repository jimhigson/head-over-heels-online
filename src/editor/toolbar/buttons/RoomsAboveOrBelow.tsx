import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { RoomSelect } from "../../../ui/RoomSelect";
import { type EditorRoomId } from "../../editorTypes";
import {
  selectCursorRoomId,
  selectCursorSubRoomVerticalLink,
} from "../../slice/levelEditorSelectors";
import {
  changeToRoom,
  setRoomAboveOrBelow,
} from "../../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

const RoomsAboveOrBelowSelectOrCreate = ({
  currentRoomId,
  direction,
}: {
  currentRoomId: EditorRoomId | undefined;
  direction: "above" | "below";
}) => {
  const campaign = useEditorAppSelector(
    ({ levelEditor }) => levelEditor.campaignInProgress,
  );
  const currentlyEditingRoomId = useEditorAppSelector(({ levelEditor }) =>
    selectCursorRoomId(levelEditor),
  );
  const dispatch = useAppDispatch();

  const directionArrow = direction === "above" ? "⬆" : "⬇";
  return (
    <>
      <div class="flex flex-row gap-oneScaledPix w-full flex-wrap pt-1 items-center">
        <span class="text-lightGrey h-1 text-single-line">
          Room {directionArrow}
        </span>
        <div class="flex-grow" />
        <div class="flex flex-row gap-oneScaledPix">
          <ToolbarButton
            small
            ariaLabel={`Switch to room ${direction}`}
            class="bg-highlightBeige w-max px-half"
            tooltipContent={`Switch to the room *${direction}*`}
            disabled={!currentRoomId}
          >
            <span
              class="text-single-line"
              onClick={() =>
                currentRoomId && dispatch(changeToRoom(currentRoomId))
              }
            >
              {`Go ${directionArrow}`}
            </span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel={`Add new room ${direction}`}
            class=" bg-moss"
            tooltipContent={`Add a new room *${direction}* this one`}
          >
            <span
              class="text-single-line"
              onClick={() =>
                dispatch(
                  setRoomAboveOrBelow({
                    direction,
                    createNew: true,
                  }),
                )
              }
            >
              +
            </span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel={`Break link with room ${direction}`}
            class="bg-midRed"
            tooltipContent={`Break the link with the room *${direction}*`}
          >
            <span
              class="text-single-line"
              onClick={() =>
                dispatch(
                  setRoomAboveOrBelow({
                    direction,
                    createNew: false,
                    roomId: undefined,
                  }),
                )
              }
            >
              x
            </span>
          </ToolbarButton>
        </div>
      </div>
      <div class="flex flex-row gap-oneScaledPix w-full flex-wrap">
        <RoomSelect
          value={currentRoomId}
          campaign={campaign}
          excludeRoomIds={[currentlyEditingRoomId]}
          triggerButtonClassName="w-full"
          onSelect={(roomId) => {
            dispatch(
              setRoomAboveOrBelow({
                direction,
                createNew: false,
                roomId,
              }),
            );
          }}
          tooltipContent={`Select a room to place *${direction}* this one`}
        />
      </div>
    </>
  );
};

export const RoomAboveSelectOrCreate = () => {
  const roomAboveId = useEditorAppSelector(({ levelEditor }) => {
    return selectCursorSubRoomVerticalLink(levelEditor, "above")?.room;
  });

  return (
    <>
      <RoomsAboveOrBelowSelectOrCreate
        currentRoomId={roomAboveId}
        direction="above"
      />
    </>
  );
};

export const RoomBelowSelectOrCreate = () => {
  const roomBelowId = useEditorAppSelector(({ levelEditor }) => {
    return selectCursorSubRoomVerticalLink(levelEditor, "below")?.room;
  });

  return (
    <>
      <RoomsAboveOrBelowSelectOrCreate
        currentRoomId={roomBelowId}
        direction="below"
      />
    </>
  );
};
