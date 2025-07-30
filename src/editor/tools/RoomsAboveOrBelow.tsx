import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useAppDispatch } from "../../store/hooks";
import { Button } from "../../ui/button";
import { RoomSelect } from "../../ui/RoomSelect";
import type { EditorRoomId } from "../editorTypes";
import {
  setRoomAboveOrBelow,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { selectCurrentRoomFromLevelEditorState } from "../slice/levelEditorSliceSelectors";

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

  return (
    <>
      <div className="flex flex-row gap-oneScaledPix w-full flex-wrap pt-1">
        <BitmapText className="text-lightGrey leading-none">
          Room {direction === "above" ? "⬆" : "⬇"}
        </BitmapText>
        <div className="flex-grow" />
        <div className="flex flex-row gap-oneScaledPix">
          <Button
            className="w-2 leading-none bg-moss"
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
          </Button>
          <Button
            className="w-2 leading-none bg-midRed"
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
          </Button>
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
