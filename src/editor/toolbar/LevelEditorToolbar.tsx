import { useAppDispatch } from "../../store/hooks";
import { useEditorAppSelector } from "../../store/store";
import { RoomSelect } from "../../ui/RoomSelect";
import {
  Toolbar,
  ToolbarSection,
  ToolbarSectionContents,
  ToolbarSectionHeader,
} from "../../ui/Toolbar";
import { selectCursorRoomId } from "../slice/levelEditorSelectors";
import { changeToRoom } from "../slice/levelEditorSlice";
import { buttonDefinitions } from "./buttonDefinitions";
import { AddAndDeleteRoomButtons } from "./buttons/AddAndDeleteRoomButtons";
import { AutoCoalesceSwitch } from "./buttons/AutoCoalesceSwitch";
import { BackAndForwardRoomButtons } from "./buttons/BackAndForwardRoomButtons";
import { ClearRoomButton } from "./buttons/ClearRoomButton";
import { CopyPasteButtons } from "./buttons/CopyPasteButtons";
import { DeleteItemToolButton } from "./buttons/DeleteItemToolButton";
import { DoorToolButton } from "./buttons/DoorToolButton";
import { EyeDropperButton } from "./buttons/EyeDropperButton";
import { HalfGridResolutionSwitch } from "./buttons/HalfGridResolutionSwitch";
import { LoggedInStatus } from "./buttons/LoggedInStatus";
import { NewCampaignButton } from "./buttons/NewCampaignButton";
import { NudgeButtons } from "./buttons/NudgeButtons";
import { PlayTestButton } from "./buttons/PlayTestButton";
import { PointerToolButton } from "./buttons/PointerToolButton";
import { RoomColourSelect } from "./buttons/RoomColourSelect";
import {
  RoomAboveSelectOrCreate,
  RoomBelowSelectOrCreate,
} from "./buttons/RoomsAboveOrBelow";
import { RoomScenerySelect } from "./buttons/RoomScenerySelect";
import { ShareCampaignButton } from "./buttons/ShareCampaignButton";
import { ShowCmdKButton } from "./buttons/ShowCmdKButton";
import { UndoRedoButtons } from "./buttons/UndoRedoButtons";
import { VerifyCampaignButton } from "./buttons/VerifyCampaignButton";
import { WallsFloorsLockedSwitch } from "./buttons/WallsFloorsLockedSwitch";
import { WallToolButton } from "./buttons/WallToolButton";
import { CurrentCampaignInfo } from "./CurrentCampaignInfo";
import { EditorShowBoundingBoxSelect } from "./EditorShowBoundingBoxSelect";
import { ItemToolButton } from "./ItemToolButton";
import { MultipleToolButtons } from "./MultipleToolButtons";
import { SaveAndLoadButtons } from "./saving/SaveAndLoadButtons";

const HorizontalGap = () => <div class="w-[calc(var(--block)-1px)]" />;
const VerticalGap = () => <div class="w-full h-half" />;

export const LevelEditorToolbar = () => {
  const campaign = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress,
  );
  const currentlyEditingRoomId = useEditorAppSelector((state) =>
    selectCursorRoomId(state.levelEditor),
  );
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
          <NewCampaignButton />
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
          <ClearRoomButton />
          <RoomSelect
            value={currentlyEditingRoomId}
            campaign={campaign}
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
          <ShowCmdKButton />
          <PointerToolButton />
          <EyeDropperButton />
          <HorizontalGap />
          <UndoRedoButtons />
          <HorizontalGap />
          <CopyPasteButtons />
          <HorizontalGap />
          <DeleteItemToolButton />
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
          <ItemToolButton {...buttonDefinitions["block.organic"]} />
          <ItemToolButton
            {...buttonDefinitions["block.organic.disappearing"]}
          />
          <ItemToolButton {...buttonDefinitions["block.artificial"]} />
          <ItemToolButton
            {...buttonDefinitions["block.artificial.disappearing"]}
          />
          <ItemToolButton {...buttonDefinitions["block.tower"]} />
          <ItemToolButton {...buttonDefinitions["block.book"]} />
          <MultipleToolButtons>
            <ItemToolButton {...buttonDefinitions["barrier.x"]} />
            <ItemToolButton {...buttonDefinitions["barrier.y"]} />
            <ItemToolButton {...buttonDefinitions["barrier.x.disappearing"]} />
            <ItemToolButton {...buttonDefinitions["barrier.y.disappearing"]} />
          </MultipleToolButtons>
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Monsters</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <ItemToolButton {...buttonDefinitions["monster.dalek"]} />
          <ItemToolButton {...buttonDefinitions["monster.cyberman"]} />
          <ItemToolButton {...buttonDefinitions["monster.skiHead"]} />
          <ItemToolButton {...buttonDefinitions["monster.helicopterBug"]} />
          <ItemToolButton {...buttonDefinitions["monster.turtle"]} />
          <ItemToolButton {...buttonDefinitions["monster.homingBot"]} />
          <ItemToolButton {...buttonDefinitions["monster.computerBot"]} />
          <ItemToolButton {...buttonDefinitions["monster.bubbleRobot"]} />
          <ItemToolButton {...buttonDefinitions["monster.monkey"]} />
          <ItemToolButton {...buttonDefinitions["monster.elephant"]} />
          <ItemToolButton {...buttonDefinitions["monster.elephantHead"]} />
          <ItemToolButton {...buttonDefinitions["monster.emperorsGuardian"]} />
          <ItemToolButton {...buttonDefinitions["monster.emperor"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Pickups</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <MultipleToolButtons>
            <ItemToolButton {...buttonDefinitions["pickup.extraLife"]} />
            <ItemToolButton {...buttonDefinitions["pickup.shield"]} />
            <ItemToolButton {...buttonDefinitions["pickup.jumps"]} />
            <ItemToolButton {...buttonDefinitions["pickup.fast"]} />
          </MultipleToolButtons>
          <ItemToolButton {...buttonDefinitions["pickup.bag"]} />
          <ItemToolButton {...buttonDefinitions["pickup.hooter"]} />
          <ItemToolButton {...buttonDefinitions["pickup.doughnuts"]} />
          <ItemToolButton {...buttonDefinitions["pickup.reincarnation"]} />
          <ItemToolButton {...buttonDefinitions["pickup.crown"]} />
          <ItemToolButton {...buttonDefinitions["pickup.scroll"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Deadly</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <MultipleToolButtons>
            <ItemToolButton {...buttonDefinitions["deadlyBlock.volcano"]} />
            <ItemToolButton {...buttonDefinitions["deadlyBlock.toaster"]} />
          </MultipleToolButtons>
          <ItemToolButton {...buttonDefinitions["slidingDeadly.spikyBall"]} />
          <ItemToolButton {...buttonDefinitions["spikes"]} />
          <ItemToolButton {...buttonDefinitions["moveableDeadly.deadFish"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Control</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <ItemToolButton {...buttonDefinitions["charles"]} />
          <ItemToolButton {...buttonDefinitions["joystick"]} />
          <ItemToolButton {...buttonDefinitions["switch"]} />
          <ItemToolButton {...buttonDefinitions["button"]} />
          <ItemToolButton {...buttonDefinitions["emitter"]} />
          <ItemToolButton {...buttonDefinitions["timer"]} />
          <ItemToolButton {...buttonDefinitions["lamp"]} />
          <ItemToolButton {...buttonDefinitions["mirror"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Movable</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <ItemToolButton {...buttonDefinitions["spring"]} />
          <MultipleToolButtons>
            <ItemToolButton {...buttonDefinitions["portableBlock.cube"]} />
            <ItemToolButton {...buttonDefinitions["portableBlock.drum"]} />
            <ItemToolButton {...buttonDefinitions["portableBlock.sticks"]} />
          </MultipleToolButtons>
          <ItemToolButton {...buttonDefinitions["pushableBlock"]} />
          <ItemToolButton {...buttonDefinitions["ball"]} />
          <ItemToolButton {...buttonDefinitions["slidingBlock.puck"]} />
          <ItemToolButton {...buttonDefinitions["slidingBlock.book"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Misc.</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <ItemToolButton {...buttonDefinitions["lift"]} />
          <MultipleToolButtons>
            <ItemToolButton {...buttonDefinitions["conveyor.away"]} />
            <ItemToolButton {...buttonDefinitions["conveyor.towards"]} />
            <ItemToolButton {...buttonDefinitions["conveyor.left"]} />
            <ItemToolButton {...buttonDefinitions["conveyor.right"]} />
          </MultipleToolButtons>
          <ItemToolButton {...buttonDefinitions["teleporter"]} />
          <ItemToolButton {...buttonDefinitions["portableTeleporter"]} />
          <ItemToolButton {...buttonDefinitions["movingPlatform"]} />
          <ItemToolButton {...buttonDefinitions["hushPuppy"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Structure</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <DoorToolButton />
          <WallToolButton />
          <ItemToolButton {...buttonDefinitions["floor"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>Player</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <ItemToolButton {...buttonDefinitions["player.head"]} />
          <ItemToolButton {...buttonDefinitions["player.heels"]} />
        </ToolbarSectionContents>
      </ToolbarSection>
      <ToolbarSection>
        <ToolbarSectionHeader>NPC's</ToolbarSectionHeader>
        <ToolbarSectionContents>
          <ItemToolButton {...buttonDefinitions["sceneryPlayer.head"]} />
          <ItemToolButton {...buttonDefinitions["sceneryPlayer.heels"]} />
          <ItemToolButton
            {...buttonDefinitions["sceneryPlayer.headOverHeels"]}
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
