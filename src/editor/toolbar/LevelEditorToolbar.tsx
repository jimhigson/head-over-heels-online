import { useAppDispatch } from "../../store/hooks";
import { useEditorAppSelector } from "../../store/store";
import { RoomSelect } from "../../ui/RoomSelect";
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
import { buttonGroupClassname } from "./buttonSizeClassNames";
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
    <div
      class="scale-editor flex w-full h-full text-white bg-metallicBlueHalfbrite pb-1 gap-1 flex-wrap justify-start overflow-auto"
      aria-label="toolbar"
      aria-description="toolbar for the editor, exposing most of its editing power such as loading/saving campaigns, selecting tools to edit, resizing items"
    >
      <div class={buttonGroupClassname}>
        <LoggedInStatus class="w-full mb-1" />
      </div>
      <div class={buttonGroupClassname}>
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
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full pt-1 text-single-line">Room</span>
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
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full pt-1 text-single-line">Edit</span>
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
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full pt-1 text-single-line">Blocks</span>
        <ItemToolButton {...buttonDefinitions["block.organic"]} />
        <ItemToolButton {...buttonDefinitions["block.organic.disappearing"]} />
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
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">Monsters</span>
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
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">Pickups</span>
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
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">Deadly</span>
        <MultipleToolButtons>
          <ItemToolButton {...buttonDefinitions["deadlyBlock.volcano"]} />
          <ItemToolButton {...buttonDefinitions["deadlyBlock.toaster"]} />
        </MultipleToolButtons>
        <ItemToolButton {...buttonDefinitions["slidingDeadly.spikyBall"]} />
        <ItemToolButton {...buttonDefinitions["spikes"]} />
        <ItemToolButton {...buttonDefinitions["moveableDeadly.deadFish"]} />
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">Control</span>
        <ItemToolButton {...buttonDefinitions["charles"]} />
        <ItemToolButton {...buttonDefinitions["joystick"]} />
        <ItemToolButton {...buttonDefinitions["switch"]} />
        <ItemToolButton {...buttonDefinitions["button"]} />
        <ItemToolButton {...buttonDefinitions["emitter"]} />
        <ItemToolButton {...buttonDefinitions["timer"]} />
        <ItemToolButton {...buttonDefinitions["lamp"]} />
        <ItemToolButton {...buttonDefinitions["mirror"]} />
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">Movable</span>
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
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">Misc.</span>
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
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">Structure</span>
        <DoorToolButton />
        <WallToolButton />
        <ItemToolButton {...buttonDefinitions["floor"]} />
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">Player</span>
        <ItemToolButton {...buttonDefinitions["player.head"]} />
        <ItemToolButton {...buttonDefinitions["player.heels"]} />
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full text-single-line">NPC's</span>
        <ItemToolButton {...buttonDefinitions["sceneryPlayer.head"]} />
        <ItemToolButton {...buttonDefinitions["sceneryPlayer.heels"]} />
        <ItemToolButton {...buttonDefinitions["sceneryPlayer.headOverHeels"]} />
      </div>
      <div class={buttonGroupClassname}>
        <span class="w-full pt-2 text-single-line">Debug</span>
        <EditorShowBoundingBoxSelect />
      </div>
    </div>
  );
};
