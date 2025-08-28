import type { Xy } from "../../utils/vectors/vectors";

import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useDispatchActionCallback } from "../../store/useDispatchActionCallback";
import {
  addRoom,
  removeRoom,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { twClass } from "../twClass";
import { MenuButton, MenuItemButton } from "./MenuButton";
import { ToolbarButton } from "./ToolbarButton";

// Extracted component for room creation menu items
const AddRoomMenuItem = ({
  label,
  iconClass,
  roomSize = { x: 8, y: 8 },
  gridPositions,
}: {
  label: string;
  iconClass: string;
  roomSize?: Xy;
  gridPositions?: Xy[];
}) => {
  return (
    <MenuItemButton
      onClick={useDispatchActionCallback(addRoom, {
        roomSize,
        gridPositions,
      })}
    >
      <BitmapText>{label}</BitmapText>
      <span className={iconClass} />
    </MenuItemButton>
  );
};

const addTooltipMarkdown = `
## Add room

Add a **new room** to this campaign

Nothing will link to the room so add *doors* and *teleporters* to get into it
`;

const deleteTooltipMarkdown = `
## Delete room

Delete this room
`;

export const AddAndDeleteRoomButtons = () => {
  const hasOtherRooms = useAppSelectorWithLevelEditorSlice(
    (state) =>
      Object.keys(state.levelEditor.campaignInProgress.rooms).length > 1,
  );

  return (
    <>
      <MenuButton
        main={
          <ToolbarButton
            className="bg-moss"
            onClick={useDispatchActionCallback(addRoom, {})}
            tooltipContent={addTooltipMarkdown}
          >
            <span className={`sprite texture-hud_char_+ relative`} />
          </ToolbarButton>
        }
      >
        {[
          <AddRoomMenuItem
            label="single 8x8"
            roomSize={{ x: 8, y: 8 }}
            iconClass={twClass(
              "sprite texture-editor_addRoom_single sprite-tinted text-highlightBeige inline-block bg-pureBlack",
            )}
          />,
          <AddRoomMenuItem
            label="small 6x6"
            roomSize={{ x: 6, y: 6 }}
            iconClass={twClass(
              "sprite texture-editor_addRoom_single sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="corridor 8x2"
            roomSize={{ x: 8, y: 2 }}
            iconClass={twClass(
              "sprite texture-editor_addRoom_corridor sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="corridor 2x8"
            roomSize={{ x: 2, y: 8 }}
            iconClass={twClass(
              "sprite texture-editor_addRoom_corridor sprite-tinted text-highlightBeige scale-x-[-1]",
            )}
          />,

          // double
          <AddRoomMenuItem
            label="Double"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_double sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="Double"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_double sprite-tinted text-highlightBeige scale-x-[-1]",
            )}
          />,

          // triple
          <AddRoomMenuItem
            label="Triple x"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 2, y: 0 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_triple_line sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="Triple y"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: 2 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_triple_line sprite-tinted text-highlightBeige scale-x-[-1]",
            )}
          />,
          <AddRoomMenuItem
            label="Triple L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: -1, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_triple_^ sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="Triple L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 0, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_triple_^ sprite-tinted text-highlightBeige scale-y-[-1]",
            )}
          />,
          <AddRoomMenuItem
            label="Triple L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: 1, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_triple_^ sprite-tinted text-highlightBeige rotate-90",
            )}
          />,
          <AddRoomMenuItem
            label="Triple L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 1, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_triple_^ sprite-tinted text-highlightBeige rotate-90 scale-y-[-1]",
            )}
          />,

          // quad
          <AddRoomMenuItem
            label="Quad square"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 0, y: 1 },
              { x: 1, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_square sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="Quad z"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: 1, y: 1 },
              { x: 1, y: 2 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_s sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="Quad z"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 1, y: 1 },
              { x: 2, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_s sprite-tinted text-highlightBeige scale-x-[-1]",
            )}
          />,
          <AddRoomMenuItem
            label="Quad z"
            gridPositions={[
              { x: 0, y: 0 },
              { x: -1, y: 0 },
              { x: -1, y: 1 },
              { x: -2, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_s sprite-tinted text-highlightBeige rotate-90",
            )}
          />,
          <AddRoomMenuItem
            label="Quad z"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: -1, y: 1 },
              { x: -1, y: 2 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_s sprite-tinted text-highlightBeige scale-x-[-1] rotate-90",
            )}
          />,

          <AddRoomMenuItem
            label="Quad L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 2, y: 0 },
              { x: 2, y: -1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_31 sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="Quad L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 2, y: 0 },
              { x: 2, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_31 sprite-tinted text-highlightBeige rotate-[270deg] scale-x-[-1]",
            )}
          />,
          <AddRoomMenuItem
            label="Quad L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 2, y: 0 },
              { x: 0, y: -1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_31 sprite-tinted text-highlightBeige rotate-90 scale-x-[-1]",
            )}
          />,
          <AddRoomMenuItem
            label="Quad L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 2, y: 0 },
              { x: 0, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_31 sprite-tinted text-highlightBeige rotate-180",
            )}
          />,

          <AddRoomMenuItem
            label="Quad L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: 2 },
              { x: 1, y: 2 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_31 sprite-tinted text-highlightBeige rotate-90",
            )}
          />,

          <AddRoomMenuItem
            label="Quad L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: 2 },
              { x: -1, y: 2 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_31 sprite-tinted text-highlightBeige scale-x-[-1]",
            )}
          />,

          <AddRoomMenuItem
            label="Quad L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: 2 },
              { x: 1, y: 0 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_31 sprite-tinted text-highlightBeige rotate-180 scale-x-[-1]",
            )}
          />,
          <AddRoomMenuItem
            label="Quad L"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: -1 },
              { x: 0, y: -2 },
              { x: -1, y: -2 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_31 sprite-tinted text-highlightBeige rotate-[270deg]",
            )}
          />,

          // quad T shapes
          <AddRoomMenuItem
            label="Quad T"
            gridPositions={[
              { x: 0, y: 0 },
              { x: -1, y: 0 },
              { x: -2, y: 0 },
              { x: -1, y: -1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_t sprite-tinted text-highlightBeige",
            )}
          />,
          <AddRoomMenuItem
            label="Quad T"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: 2 },
              { x: 1, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_t sprite-tinted text-highlightBeige rotate-90",
            )}
          />,
          <AddRoomMenuItem
            label="Quad T"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: 2, y: 0 },
              { x: 1, y: 1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_t sprite-tinted text-highlightBeige rotate-180",
            )}
          />,
          <AddRoomMenuItem
            label="Quad T"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 0, y: -1 },
              { x: 0, y: -2 },
              { x: -1, y: -1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_quad_t sprite-tinted text-highlightBeige rotate-[270deg]",
            )}
          />,

          // fives
          <AddRoomMenuItem
            label="5"
            gridPositions={[
              { x: 0, y: 0 },
              { x: 1, y: 0 },
              { x: -1, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: -1 },
            ]}
            iconClass={twClass(
              "sprite texture-editor_addRoom_5_x sprite-tinted text-highlightBeige",
            )}
          />,
        ]}
      </MenuButton>
      <ToolbarButton
        className="bg-midRed"
        onClick={useDispatchActionCallback(removeRoom)}
        disabled={!hasOtherRooms}
        tooltipContent={deleteTooltipMarkdown}
      >
        <span className={`sprite texture-hud_char_X relative`} />
      </ToolbarButton>
    </>
  );
};
