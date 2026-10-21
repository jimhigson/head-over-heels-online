import { useAppDispatch } from "../../store/hooks";
import { useEditorAppSelector } from "../../store/store";
import { RoomSelect } from "../../ui/RoomSelect";
import {
  Toolbar,
  ToolbarSection,
  ToolbarSectionContents,
  ToolbarSectionHeader,
} from "../../ui/Toolbar";
import { actionCommandDefinitions } from "../commands/actionCommandDefinitions";
import { CommandToolbarButton } from "../commands/CommandToolbarButton";
import { itemToolCommandDefinitions } from "../commands/itemToolCommandDefinitions";
import { changeToRoom, selectCursorRoomId } from "../slice/levelEditorSlice";
import { selectRoomHues } from "../slice/selectRoomHues";
import { AddAndDeleteRoomButtons } from "./buttons/AddAndDeleteRoomButtons";
import { AutoCoalesceSwitch } from "./buttons/AutoCoalesceSwitch";
import { BackAndForwardRoomButtons } from "./buttons/BackAndForwardRoomButtons";
import { CopyPasteButtons } from "./buttons/CopyPasteButtons";
import { DoorToolButton } from "./buttons/DoorToolButton";
import { HalfGridResolutionSwitch } from "./buttons/HalfGridResolutionSwitch";
import { LoggedInStatus } from "./buttons/LoggedInStatus";
import { NudgeButtons } from "./buttons/NudgeButtons";
import { PlayTestButton } from "./buttons/PlayTestButton";
import { RoomColourSelect } from "./buttons/RoomColourSelect";
import {
  RoomAboveSelectOrCreate,
  RoomBelowSelectOrCreate,
} from "./buttons/RoomsAboveOrBelow";
import { RoomScenerySelect } from "./buttons/RoomScenerySelect";
import { ShareCampaignButton } from "./buttons/ShareCampaignButton";
import { UndoRedoButtons } from "./buttons/UndoRedoButtons";
import { VerifyCampaignButton } from "./buttons/VerifyCampaignButton";
import { WallsFloorsLockedSwitch } from "./buttons/WallsFloorsLockedSwitch";
import { WallToolButton } from "./buttons/WallToolButton";
import { CurrentCampaignInfo } from "./CurrentCampaignInfo";
import { EditorShowBoundingBoxSelect } from "./EditorShowBoundingBoxSelect";
import { MultipleToolButtons } from "./MultipleToolButtons";
import { SaveAndLoadButtons } from "./saving/SaveAndLoadButtons";

const HorizontalGap = () => <div class="w-[calc(var(--block)-1px)]" />;
const VerticalGap = () => <div class="w-full h-half" />;

export const LevelEditorToolbar = () => {
  const campaignRoomHues = useEditorAppSelector(selectRoomHues);
  const currentlyEditingRoomId = useEditorAppSelector(selectCursorRoomId);
  const dispatch = useAppDispatch();

  return (
    <Toolbar
      class="scale-editor"
      ariaLabel="toolbar"
      ariaDescription="toolbar for the editor, exposing most of its editing power such as loading/saving campaigns, selecting tools to edit, resizing items"
    >
      <ToolbarSection>
        <ToolbarSectionContents>
          <LoggedInStatus class="w-full mb-1" />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionContents>
          <div class="w-full">
            <CurrentCampaignInfo />
          </div>
          <VerticalGap />
          <VerifyCampaignButton />
          <VerticalGap />
          <CommandToolbarButton
            command={actionCommandDefinitions.newCampaign}
          />
          <HorizontalGap />
          <SaveAndLoadButtons />
          <HorizontalGap />
          <ShareCampaignButton />
          <PlayTestButton />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Room</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <BackAndForwardRoomButtons />
          <HorizontalGap />
          <AddAndDeleteRoomButtons />
          <HorizontalGap />
          <CommandToolbarButton command={actionCommandDefinitions.clearRoom} />
          <RoomSelect
            value={currentlyEditingRoomId}
            roomHues={campaignRoomHues}
            onSelect={(roomId) => {
              dispatch(changeToRoom(roomId));
            }}
            triggerButtonClassName="w-full"
            tooltipContent="Choose the room to view/edit"
          />
          <div class="h-1 w-full" />
          <RoomScenerySelect />
          <RoomColourSelect />
          <div class="h-half w-full" />
          <RoomAboveSelectOrCreate />
          <RoomBelowSelectOrCreate />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Edit</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <CommandToolbarButton
            command={actionCommandDefinitions.commandPalette}
          />
          <CommandToolbarButton
            command={actionCommandDefinitions.pointerTool}
          />
          <CommandToolbarButton
            command={actionCommandDefinitions.eyeDropperTool}
          />
          <HorizontalGap />
          <UndoRedoButtons />
          <HorizontalGap />
          <CopyPasteButtons />
          <HorizontalGap />
          <CommandToolbarButton command={actionCommandDefinitions.delete} />
          <NudgeButtons />
          <div class="h-1 w-full" />
          <div class="flex flex-row justify-between flex-wrap gap-x-2">
            <HalfGridResolutionSwitch />
            <WallsFloorsLockedSwitch />
            <AutoCoalesceSwitch />
          </div>
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Blocks</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["block.organic"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["block.organic.disappearing"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["block.artificial"]}
          />
          <CommandToolbarButton
            command={
              itemToolCommandDefinitions["block.artificial.disappearing"]
            }
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["block.tower"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["block.book"]}
          />
          <MultipleToolButtons>
            <CommandToolbarButton
              command={itemToolCommandDefinitions["barrier.x"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["barrier.y"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["barrier.x.disappearing"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["barrier.y.disappearing"]}
            />
          </MultipleToolButtons>
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Monsters</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.dalek"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.cyberman"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.skiHead"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.helicopterBug"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.turtle"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.homingBot"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.computerBot"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.bubbleRobot"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.monkey"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.elephant"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.elephantHead"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.emperorsGuardian"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["monster.emperor"]}
          />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Pickups</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <MultipleToolButtons>
            <CommandToolbarButton
              command={itemToolCommandDefinitions["pickup.extraLife"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["pickup.shield"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["pickup.jumps"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["pickup.fast"]}
            />
          </MultipleToolButtons>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["pickup.bag"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["pickup.hooter"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["pickup.doughnuts"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["pickup.reincarnation"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["pickup.crown"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["pickup.scroll"]}
          />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Deadly</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <MultipleToolButtons>
            <CommandToolbarButton
              command={itemToolCommandDefinitions["deadlyBlock.volcano"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["deadlyBlock.toaster"]}
            />
          </MultipleToolButtons>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["slidingDeadly.spikyBall"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["spikes"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["moveableDeadly.deadFish"]}
          />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Control</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["charles"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["joystick"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["switch"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["button"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["emitter"]}
          />
          <CommandToolbarButton command={itemToolCommandDefinitions["timer"]} />
          <CommandToolbarButton command={itemToolCommandDefinitions["lamp"]} />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["mirror"]}
          />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Movable</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["spring"]}
          />
          <MultipleToolButtons>
            <CommandToolbarButton
              command={itemToolCommandDefinitions["portableBlock.cube"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["portableBlock.drum"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["portableBlock.sticks"]}
            />
          </MultipleToolButtons>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["pushableBlock"]}
          />
          <CommandToolbarButton command={itemToolCommandDefinitions["ball"]} />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["slidingBlock.puck"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["slidingBlock.book"]}
          />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Misc.</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <CommandToolbarButton command={itemToolCommandDefinitions["lift"]} />
          <MultipleToolButtons>
            <CommandToolbarButton
              command={itemToolCommandDefinitions["conveyor.away"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["conveyor.towards"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["conveyor.left"]}
            />
            <CommandToolbarButton
              command={itemToolCommandDefinitions["conveyor.right"]}
            />
          </MultipleToolButtons>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["teleporter"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["portableTeleporter"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["movingPlatform"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["hushPuppy"]}
          />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Structure</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <DoorToolButton />
          <WallToolButton />
          <CommandToolbarButton command={itemToolCommandDefinitions["floor"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Player</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["player.head"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["player.heels"]}
          />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>NPC's</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <CommandToolbarButton
            command={itemToolCommandDefinitions["sceneryPlayer.head"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["sceneryPlayer.heels"]}
          />
          <CommandToolbarButton
            command={itemToolCommandDefinitions["sceneryPlayer.headOverHeels"]}
          />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Debug</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <EditorShowBoundingBoxSelect />
        </ToolbarSectionContents>
      </ToolbarSection>
    </Toolbar>
  );
};
