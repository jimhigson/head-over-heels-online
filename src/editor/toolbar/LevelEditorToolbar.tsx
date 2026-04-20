import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import { useAppDispatch } from "../../store/hooks";
import { RoomSelect } from "../../ui/RoomSelect";
import {
  changeToRoom,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
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
import { WallsFloorsLockedSwitch } from "./buttons/WallsFloorsLockedSwitch";
import { WallToolButton } from "./buttons/WallToolButton";
import { buttonGroupClassname } from "./buttonSizeClassNames";
import { ItemToolButton } from "./ItemToolButton";
import { MultipleToolButtons } from "./MultipleToolButtons";
import { SaveAndLoadButtons } from "./saving/SaveAndLoadButtons";

const HorizontalGap = () => <div className="w-[calc(var(--block)-1px)]" />;

export const LevelEditorToolbar = () => {
  const campaign = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.campaignInProgress,
  );
  const currentlyEditingRoomId = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.currentlyEditingRoomId,
  );
  const dispatch = useAppDispatch();
  const campaignName = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.campaignInProgress.locator.campaignName,
  );

  return (
    <div className="scale-editor flex w-full h-full text-white bg-metallicBlueHalfbrite pb-1 gap-1 flex-wrap justify-start overflow-auto">
      <div className={buttonGroupClassname}>
        <LoggedInStatus className="w-full mb-1" />
      </div>
      <div className={buttonGroupClassname}>
        <div className="w-full flex flex-wrap gap-x-1">
          <BitmapText className="">Campaign</BitmapText>
          {campaignName ?
            <BitmapText className="text-highlightBeige">
              {`'${campaignName}'`}
            </BitmapText>
          : <BitmapText className="text-midRed">{`(untitled)`}</BitmapText>}
        </div>
        <SaveAndLoadButtons />
        <HorizontalGap />
        <ShareCampaignButton />
        <PlayTestButton />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full pt-1">Room</BitmapText>
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
        <div className="h-1 w-full" />
        <RoomScenerySelect />
        <RoomColourSelect />
        <div className="h-half w-full" />
        <RoomAboveSelectOrCreate />
        <RoomBelowSelectOrCreate />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full pt-1">Edit</BitmapText>
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
        <div className="h-1 w-full" />
        <div className="flex flex-row justify-between flex-wrap gap-x-2">
          <HalfGridResolutionSwitch />
          <WallsFloorsLockedSwitch />
          <AutoCoalesceSwitch />
        </div>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full pt-1">Blocks</BitmapText>
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
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Monsters</BitmapText>
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
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Pickups</BitmapText>
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
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Deadly</BitmapText>
        <MultipleToolButtons>
          <ItemToolButton {...buttonDefinitions["deadlyBlock.volcano"]} />
          <ItemToolButton {...buttonDefinitions["deadlyBlock.toaster"]} />
        </MultipleToolButtons>
        <ItemToolButton {...buttonDefinitions["slidingDeadly.spikyBall"]} />
        <ItemToolButton {...buttonDefinitions["spikes"]} />
        <ItemToolButton {...buttonDefinitions["moveableDeadly.deadFish"]} />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Control</BitmapText>
        <ItemToolButton {...buttonDefinitions["charles"]} />
        <ItemToolButton {...buttonDefinitions["joystick"]} />
        <ItemToolButton {...buttonDefinitions["switch"]} />
        <ItemToolButton {...buttonDefinitions["button"]} />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Movable</BitmapText>
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
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Misc.</BitmapText>
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
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Structure</BitmapText>
        <DoorToolButton />
        <WallToolButton />
        <ItemToolButton {...buttonDefinitions["floor"]} />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Player</BitmapText>
        <ItemToolButton {...buttonDefinitions["player.head"]} />
        <ItemToolButton {...buttonDefinitions["player.heels"]} />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">NPC's</BitmapText>
        <ItemToolButton {...buttonDefinitions["sceneryPlayer.head"]} />
        <ItemToolButton {...buttonDefinitions["sceneryPlayer.heels"]} />
        <ItemToolButton {...buttonDefinitions["sceneryPlayer.headOverHeels"]} />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full pt-2">Debug</BitmapText>
        <ShowBoundingBoxSelect />
      </div>
    </div>
  );
};
