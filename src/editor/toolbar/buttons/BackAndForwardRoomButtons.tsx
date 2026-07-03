import { type TextureTailwindClass } from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppDispatch } from "../../../store/hooks";
import { useIsUncolourised } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { useEditorAppSelector } from "../../../store/store";
import {
  roomBack,
  roomForward,
  selectBackRooms,
  selectCurrentCampaignInProgress,
  selectForwardRooms,
} from "../../slice/levelEditorSlice";
import { MenuButton, MenuItemButton } from "./MenuButton";
import { cssForRoomColour } from "./RoomColourSelect";
import { ToolbarButton } from "./ToolbarButton";

const backTooltipMarkdown = `
## Back

Go back to the previous room
`;

const forwardTooltipMarkdown = `
## Forward

The opposite of back
`;

const maxHistoryItems = 8;

export const BackAndForwardRoomButtons = () => {
  const backRooms = useEditorAppSelector(selectBackRooms);
  const forwardRooms = useEditorAppSelector(selectForwardRooms);
  const campaign = useEditorAppSelector(selectCurrentCampaignInProgress);
  const uncolourised = useIsUncolourised();
  const dispatch = useAppDispatch();

  return (
    <>
      <MenuButton
        main={
          <ToolbarButton
            ariaLabel="Previous room"
            class="bg-highlightBeige"
            disabled={backRooms.length === 0}
            onClick={() => {
              dispatch(roomBack());
            }}
            // this is bit weird - need to give shift on OSX since the <
            // is on the , key, and can only be types using shift.
            // I think windows is the same, so this should be ok
            shortcutKeys={["⇧<"]}
            tooltipContent={backTooltipMarkdown}
          >
            <span
              class={`sprite ${"texture-hud_char_lt" satisfies TextureTailwindClass} relative`}
            />
          </ToolbarButton>
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
              style={cssForRoomColour(
                campaign.rooms[roomId].color.hue,
                uncolourised,
              )}
            >
              <span class="text-single-line">{roomId}</span>
            </MenuItemButton>
          ))}
      </MenuButton>
      <MenuButton
        main={
          <ToolbarButton
            ariaLabel="Next room"
            class="bg-highlightBeige"
            disabled={forwardRooms.length === 0}
            onClick={() => {
              dispatch(roomForward());
            }}
            shortcutKeys={["⇧>"]}
            tooltipContent={forwardTooltipMarkdown}
          >
            <span
              class={`sprite ${"texture-hud_char_gt" satisfies TextureTailwindClass} relative`}
            />
          </ToolbarButton>
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
              style={cssForRoomColour(
                campaign.rooms[roomId].color.hue,
                uncolourised,
              )}
            >
              <span class="text-single-line">{roomId}</span>
            </MenuItemButton>
          ))}
      </MenuButton>
    </>
  );
};
