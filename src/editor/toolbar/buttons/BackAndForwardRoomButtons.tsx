import { useAppDispatch } from "../../../store/hooks";
import { useIsUncolourised } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { useEditorAppSelector } from "../../../store/store";
import { actionCommandDefinitions } from "../../commands/actionCommandDefinitions";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import {
  roomBack,
  roomForward,
  selectBackRooms,
  selectForwardRooms,
} from "../../slice/levelEditorSlice";
import { selectRoomHues } from "../../slice/selectRoomHues";
import { MenuButton, MenuItemButton } from "./MenuButton";
import { cssForRoomColour } from "./RoomColourSelect";

const maxHistoryItems = 8;

export const BackAndForwardRoomButtons = () => {
  const backRooms = useEditorAppSelector(selectBackRooms);
  const forwardRooms = useEditorAppSelector(selectForwardRooms);
  const campaignRoomHues = useEditorAppSelector(selectRoomHues);
  const uncolourised = useIsUncolourised();
  const dispatch = useAppDispatch();

  return (
    <>
      <MenuButton
        main={
          <CommandToolbarButton
            command={actionCommandDefinitions.previousRoom}
          />
        }
      >
        {backRooms
          .slice(-maxHistoryItems)
          .reverse()
          .map((roomId, index) => (
            <MenuItemButton
              key={`${roomId}-${index}`}
              onClick={() => dispatch(roomBack(index + 1))}
              class="command-colours"
              style={cssForRoomColour(campaignRoomHues[roomId], uncolourised)}
            >
              <span class="text-single-line">{roomId}</span>
            </MenuItemButton>
          ))}
      </MenuButton>
      <MenuButton
        main={
          <CommandToolbarButton command={actionCommandDefinitions.nextRoom} />
        }
      >
        {forwardRooms
          .slice(-maxHistoryItems)
          .reverse()
          .map((roomId, index) => (
            <MenuItemButton
              key={`${roomId}-${index}`}
              onClick={() => dispatch(roomForward(index + 1))}
              class="command-colours"
              style={cssForRoomColour(campaignRoomHues[roomId], uncolourised)}
            >
              <span class="text-single-line">{roomId}</span>
            </MenuItemButton>
          ))}
      </MenuButton>
    </>
  );
};
