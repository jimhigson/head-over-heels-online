import type { EditorRoomId } from "../editorTypes";

import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useAppDispatch } from "../../store/hooks";
import { RoomSelect } from "../../ui/RoomSelect";
import { selectCurrentRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import {
  changeToRoom,
  setRoomAboveOrBelow,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

const RoomsAboveOrBelowSelectOrCreate = ({
  currentRoomId,
  direction,
}: {
  currentRoomId: EditorRoomId | undefined;
  direction: "above" | "below";
}) => {
  const campaign = useAppSelectorWithLevelEditorSlice(
    ({ levelEditor }) => levelEditor.campaignInProgress,
  );
  const currentlyEditingRoomId = useAppSelectorWithLevelEditorSlice(
    ({ levelEditor }) => levelEditor.currentlyEditingRoomId,
  );
  const dispatch = useAppDispatch();

  const directionArrow = direction === "above" ? "⬆" : "⬇";
  return (
    <>
      <div className="flex flex-row gap-oneScaledPix w-full flex-wrap pt-1 items-center">
        <BitmapText className="text-lightGrey leading-none h-1">
          Room {directionArrow}
        </BitmapText>
        <div className="flex-grow" />
        <div className="flex flex-row gap-oneScaledPix">
          <ToolbarButton
            small
            className="bg-highlightBeige w-max px-half"
            tooltipContent={`Switch to the room *${direction}*`}
            disabled={!currentRoomId}
          >
            <BitmapText
              onClick={() =>
                currentRoomId && dispatch(changeToRoom(currentRoomId))
              }
            >
              {`go ${directionArrow}`}
            </BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            className=" bg-moss"
            tooltipContent={`Add a new room *${direction}* this one`}
          >
            <BitmapText
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
            </BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            className="bg-midRed"
            tooltipContent={`Break the link with the room *${direction}*`}
          >
            <BitmapText
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
            </BitmapText>
          </ToolbarButton>
        </div>
      </div>
      <div className="flex flex-row gap-oneScaledPix w-full flex-wrap">
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
  const roomAboveId = useAppSelectorWithLevelEditorSlice(({ levelEditor }) => {
    return selectCurrentRoomFromLevelEditorState(levelEditor).roomAbove;
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
  const roomBelowId = useAppSelectorWithLevelEditorSlice(({ levelEditor }) => {
    return selectCurrentRoomFromLevelEditorState(levelEditor).roomBelow;
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
