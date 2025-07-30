import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import { useAppDispatch } from "../../store/hooks";
import { RoomSelect } from "../../ui/RoomSelect";
import { emptyArray, emptyObject } from "../../utils/empty";
import { originXyz } from "../../utils/vectors/vectors";
import type { EditorRoomId, EditorRoomItemId } from "../editorTypes";
import {
  changeToRoom,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { twClass } from "../twClass";
import {
  buttonSpriteRevertColourClasses,
  buttonGroupClassname,
} from "./buttonSizeClassNames";
import { DeleteItemToolButton } from "./DeleteItemButton";
import { HalfGridResolutionSwitch } from "./HalfGridResolutionSwitch";
import { ItemToolButton } from "./ItemToolButton";
import { MultipleToolButtons } from "./MultipleToolButtons";
import { PointerToolButton } from "./PointerToolButton";
import { RoomColourSelect } from "./RoomColourSelect";
import { RoomScenerySelect } from "./RoomScenerySelect";
import { UndoRedoButtons } from "./UndoRedoButtons";
import { WallsFloorsLockedSwitch } from "./WallsFloorsLockedSwitch";
import { DoorToolButton } from "./DoorToolButton";
import { WallToolButton } from "./WallToolButton";
import { ClearRoomButton } from "./ClearRoomButton";
import {
  RoomAboveSelectOrCreate,
  RoomBelowSelectOrCreate,
} from "./RoomsAboveOrBelow";
import { EyeDropperButton } from "./EyeDropperButton";
import { SaveAndLoadButtons } from "./SaveAndLoadButtons";
import {
  DissapearingItemToolbarIcon,
  LabelledToolbarIcon,
  StackedToolbarIcons,
} from "./ToolbarButtonContentPatterns";
import { MapButton } from "./MapButton";
import { PlayTestButton } from "./PlayTestButton";
import { LoggedInStatus } from "./LoggedInStatus";
import { AddAndDeleteRoomButtons } from "./AddAndRemoveRoomButtons";
import { NudgeButtons } from "./NudgeButtons";
import { BackAndForwardRoomButtons } from "./BackAndForwardRoomButtons";
import { AutoCoalesceSwitch } from "./AutoCoalesceSwitch";
import { ShareCampaignButton } from "./ShareCampaignButton";

const HorizontalGap = () => <div className="w-[calc(var(--block)-1px)]" />;

export const LevelEditorToolbar = () => {
  const campaign = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.campaignInProgress,
  );
  const currentlyEditingRoomId = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.currentlyEditingRoomId,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="scale-editor flex w-full h-full text-white bg-metallicBlueHalfbrite pb-1 gap-1 flex-wrap justify-start overflow-auto">
      <div className={buttonGroupClassname}>
        <LoggedInStatus className="w-full mb-1" />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Campaign</BitmapText>
        <SaveAndLoadButtons />
        <ShareCampaignButton />
        <HorizontalGap />
        <MapButton />
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
        <div className={buttonGroupClassname}>
          <PointerToolButton />
          <EyeDropperButton />
        </div>
        <UndoRedoButtons />
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
        <ItemToolButton
          itemTool={{
            type: "block",
            config: { style: "organic" },
          }}
          shortcutKeys={["B"]}
        >
          <span
            className={`sprite texture-block_organic ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "block",
            config: { style: "organic", disappearing: { on: "stand" } },
          }}
        >
          <DissapearingItemToolbarIcon
            iconClassName={twClass("texture-block_organic_disappearing")}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "block", config: { style: "artificial" } }}
        >
          <span
            className={`sprite texture-block_artificial ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "block",
            config: { style: "artificial", disappearing: { on: "stand" } },
          }}
        >
          <DissapearingItemToolbarIcon
            iconClassName={twClass("texture-block_artificial_disappearing")}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "block", config: { style: "tower" } }}
        >
          <span
            className={`sprite texture-tower ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "block", config: { style: "book" } }}>
          <span
            className={`sprite texture-book_x ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <MultipleToolButtons>
          <ItemToolButton itemTool={{ type: "barrier", config: { axis: "x" } }}>
            <span
              className={`sprite texture-barrier_x ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton itemTool={{ type: "barrier", config: { axis: "y" } }}>
            <span
              className={`sprite texture-barrier_y ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{
              type: "barrier",
              config: { axis: "x", disappearing: { on: "touch" } },
            }}
          >
            <DissapearingItemToolbarIcon
              iconClassName={twClass("texture-barrier_x")}
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{
              type: "barrier",
              config: { axis: "y", disappearing: { on: "touch" } },
            }}
          >
            <DissapearingItemToolbarIcon
              iconClassName={twClass("texture-barrier_y")}
            />
          </ItemToolButton>
        </MultipleToolButtons>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Monsters</BitmapText>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "dalek",
              movement: "patrol-randomly-diagonal",
              activated: "on",
            },
          }}
          tooltipContent={`## mojo
the emperor’s worker bots

patrols randomly in a diagonal pattern`}
        >
          <span
            className={`sprite texture-dalek_1 [button:hover_&]:texture-animated-dalek" ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "cyberman",
              activated: "on",
              movement: "towards-on-shortest-axis-xy4",
              startDirection: "towards",
            },
          }}
          tooltipContent={`## guard
hovers towards the player on the shortest axis

heels can outrun, but not head

place on a toaster to make a charging guard`}
        >
          <StackedToolbarIcons
            topClasses="texture-cyberman_towards [button:hover_&]:texture-cyberman_right"
            bottomClasses="texture-bubbles_cold_2 [button:hover_&]:texture-animated-bubbles_cold"
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "skiHead",
              style: "greenAndPink",
              activated: "on",
              movement: "back-forth",
              startDirection: "towards",
            },
          }}
          tooltipContent={`## monster
moves *back and forth* by default

or can be set to *patrol clockwise*`}
        >
          <span
            className={`sprite texture-skiHead_greenAndPink_towards [button:hover_&]:texture-skiHead_greenAndPink_right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "helicopterBug",
              activated: "on",
              movement: "patrol-randomly-xy8",
            },
          }}
        >
          <span
            className={`sprite texture-helicopterBug_1 [button:hover_&]:texture-animated-helicopterBug ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "turtle",
              activated: "on",
              movement: "clockwise",
              startDirection: "towards",
            },
          }}
          tooltipContent={`## turtle
plods along in a clockwise pattern`}
        >
          <span
            className={`sprite texture-turtle_towards_1 [button:hover_&]:texture-animated-turtle_right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "homingBot",
              activated: "on",
              movement: "towards-tripped-on-axis-xy4",
            },
          }}
          tooltipContent={`## homing bot
detects a player in a straight line on an axis and rushes towards them`}
        >
          <span
            className={`sprite texture-headlessBase [button:hover_&]:texture-headlessBase_all ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "computerBot",
              activated: "on",
              movement: "patrol-randomly-xy4-and-reverse",
            },
          }}
          tooltipContent={`## Computer bot
usually patrols randomly, but can be programmed to move towards the player`}
        >
          <StackedToolbarIcons topClasses="texture-computerBot_towards [button:hover_&]:texture-computerBot_right" />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "bubbleRobot",
              activated: "on",
              movement: "patrol-randomly-xy8",
            },
          }}
          tooltipContent={`## Bubble bot
patrols randomly in 8 directions

fast and dangerous`}
        >
          <StackedToolbarIcons
            topClasses={twClass(
              "texture-bubbles_cold_2 [button:hover_&]:texture-animated-bubbles_cold",
            )}
            bottomClasses={twClass("texture-headlessBase")}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "monkey",
              activated: "on",
              movement: "patrol-randomly-xy4",
            },
          }}
        >
          <StackedToolbarIcons topClasses="texture-monkey_towards [button:hover_&]:texture-monkey_right" />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "elephant",
              activated: "on",
              movement: "patrol-randomly-xy4",
            },
          }}
        >
          <StackedToolbarIcons topClasses="texture-elephant_towards [button:hover_&]:texture-elephant_right" />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "elephantHead",
              activated: "on",
              movement: "turn-to-player",
              startDirection: "towards",
            },
          }}
          tooltipContent={`## Elephant head
Things have gone weird

Stationary, but deadly`}
        >
          <span
            className={`sprite texture-elephant_towards [button:hover_&]:texture-elephant_right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "emperorsGuardian",
              activated: "while-player-near",
              movement: "towards-analogue-unless-planet-crowns",
            },
          }}
          className="inline relative"
          tooltipContent={`## Emperor's Guardian

very dangerous

moves towards the player, unless they have all four planet crowns

does not *like doughnuts*
`}
        >
          <StackedToolbarIcons
            topClasses="texture-ball"
            bottomClasses="texture-bubbles_cold_2 [button:hover_&]:texture-animated-bubbles_cold"
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "monster",
            config: {
              which: "emperor",
              activated: "while-player-near",
              movement: "towards-analogue",
            },
          }}
          tooltipContent={`## Emperor
The end boss, usually found guarding his Blacktooth crown`}
        >
          <span
            className={`sprite texture-bubbles_cold_2 [button:hover_&]:texture-animated-bubbles_cold ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Pickups</BitmapText>
        <MultipleToolButtons>
          <ItemToolButton
            itemTool={{ type: "pickup", config: { gives: "extra-life" } }}
          >
            <LabelledToolbarIcon iconClasses="texture-whiteRabbit" text="2" />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "pickup", config: { gives: "shield" } }}
          >
            <LabelledToolbarIcon iconClasses="texture-whiteRabbit" text="🛡" />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "pickup", config: { gives: "jumps" } }}
          >
            <LabelledToolbarIcon iconClasses="texture-whiteRabbit" text="♨" />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "pickup", config: { gives: "fast" } }}
          >
            <LabelledToolbarIcon iconClasses="texture-whiteRabbit" text="⚡" />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton itemTool={{ type: "pickup", config: { gives: "bag" } }}>
          <span
            className={`sprite texture-bag ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "pickup",
            config: { gives: "hooter" },
          }}
          tooltipContent={`## hooter

head's doughnut firing hooter`}
        >
          <span
            className={`sprite texture-hooter ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>

        <ItemToolButton
          itemTool={{ type: "pickup", config: { gives: "doughnuts" } }}
        >
          <span
            className={`sprite texture-doughnuts ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>

        <ItemToolButton
          itemTool={{ type: "pickup", config: { gives: "reincarnation" } }}
        >
          <span
            className={`sprite texture-fish_1 [button:hover_&]:texture-animated-fish ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>

        <ItemToolButton
          itemTool={{
            type: "pickup",
            config: { gives: "crown", planet: "blacktooth" },
          }}
        >
          <span
            className={`sprite texture-crown_blacktooth ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "pickup",
            config: { gives: "scroll", page: "blacktooth" },
          }}
        >
          <span
            className={`sprite texture-scroll ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">deadly</BitmapText>
        <MultipleToolButtons>
          <ItemToolButton
            itemTool={{ type: "deadlyBlock", config: { style: "volcano" } }}
          >
            <span
              className={`sprite texture-volcano_1 [button:hover_&]:texture-animated-volcano ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "deadlyBlock", config: { style: "toaster" } }}
          >
            <span
              className={`sprite texture-toaster_off ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton
          itemTool={{
            type: "slidingDeadly",
            config: { style: "spikyBall", startingPhase: 1 },
          }}
          tooltipContent={`## Spiky ball
rolls fast if pushed

deadly to touch`}
        >
          <span
            className={`sprite texture-spikyBall_1 [button:hover_&]:texture-spikyBall_2 ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "spikes", config: emptyObject }}
          tooltipContent={`## spikes

deadly to touch on top

safe to run into the sides`}
        >
          <span
            className={`sprite texture-spikes ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "moveableDeadly", config: { style: "deadFish" } }}
          tooltipContent={`## dead fish

(deadly to touch)

dead fish decompose very quickly and it rapidly
turns so poisonous that a single lick can kill`}
        >
          <span
            className={`sprite texture-fish_1 ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">control</BitmapText>
        <ItemToolButton itemTool={{ type: "charles", config: emptyObject }}>
          <StackedToolbarIcons topClasses="texture-charles_towards [button:hover_&]:texture-charles_right" />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "joystick",

            config: {
              controls: [
                // the first charles put into a room will always have 'charles' as the id:
                "charles",
              ] as EditorRoomItemId[],
            },
          }}
        >
          <span
            className={`sprite texture-joystick ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "switch",
            config: {
              initialSetting: "left",
              type: "in-room",
              modifies: emptyArray,
            },
          }}
        >
          <span
            className={`sprite texture-switch_left [button:hover_&]:texture-switch_right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">movable</BitmapText>
        <ItemToolButton
          itemTool={{
            type: "spring",
            config: {},
          }}
        >
          <span
            className={`sprite texture-spring_released [button:hover_&]:texture-spring_compressed ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <MultipleToolButtons>
          <ItemToolButton
            itemTool={{ type: "portableBlock", config: { style: "cube" } }}
          >
            <span
              className={`sprite texture-cube ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "portableBlock", config: { style: "drum" } }}
          >
            <span
              className={`sprite texture-drum ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "portableBlock", config: { style: "sticks" } }}
          >
            <span
              className={`sprite texture-sticks ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton itemTool={{ type: "pushableBlock", config: {} }}>
          <span
            className={`sprite texture-stepStool ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "ball", config: emptyObject }}>
          <span
            className={`sprite texture-ball ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "slidingBlock",
            config: { style: "puck" },
          }}
          tooltipContent={`## Sliding puck

Small item that can be stood on and slides when touched`}
        >
          <span
            className={`sprite texture-puck ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "slidingBlock",
            config: { style: "book" },
          }}
          tooltipContent={`## Sliding book

Why are the books slippery?`}
        >
          <span
            className={`sprite texture-book_y ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">misc.</BitmapText>
        <ItemToolButton
          itemTool={{ type: "lift", config: { top: 11, bottom: 0 } }}
          className="inline relative"
        >
          <span
            className={`sprite inline-block absolute top-0 left-0 texture-lift_static ${buttonSpriteRevertColourClasses} [button:active_&]:top-oneScaledPix`}
          />
          <span
            className={`sprite inline-block absolute top-0 left-0 texture-lift_1 [button:hover_&]:texture-animated-lift ${buttonSpriteRevertColourClasses} [button:active_&]:top-oneScaledPix`}
          />
        </ItemToolButton>
        <MultipleToolButtons>
          <ItemToolButton
            itemTool={{ type: "conveyor", config: { direction: "away" } }}
          >
            <LabelledToolbarIcon
              iconClasses="texture-conveyor_y_1 [button:hover_&]:texture-animated-conveyor_y"
              text="↗"
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "conveyor", config: { direction: "towards" } }}
          >
            <LabelledToolbarIcon
              iconClasses="texture-conveyor_y_1 [button:hover_&]:texture-animated-reversed-conveyor_y"
              text="↙"
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "conveyor", config: { direction: "left" } }}
          >
            <LabelledToolbarIcon
              iconClasses="texture-conveyor_x_1 [button:hover_&]:texture-animated-conveyor_x"
              text="↖"
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "conveyor", config: { direction: "right" } }}
          >
            <LabelledToolbarIcon
              iconClasses="texture-conveyor_x_1 [button:hover_&]:texture-animated-reversed-conveyor_x"
              text="↘"
            />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton
          itemTool={{
            type: "teleporter",
            config: {
              toRoom: "to?" as EditorRoomId,
              toPosition: originXyz,
            },
          }}
        >
          <span
            className={`sprite texture-teleporter ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>

        <ItemToolButton
          itemTool={{
            type: "movingPlatform",
            config: {
              movement: "clockwise",
              activated: "on",
              startDirection: "towards",
            },
          }}
          tooltipContent={`## Moving Platform
Clockwise or back-and-forth

Can be (de)activated by a switch, or touch 

Why a sandwich?`}
        >
          <span
            className={`sprite texture-sandwich ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>

        <ItemToolButton
          itemTool={{
            type: "hushPuppy",
            config: {},
          }}
        >
          <span
            className={`sprite texture-hushPuppy ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Structure</BitmapText>
        <DoorToolButton />
        <WallToolButton />
        <ItemToolButton
          itemTool={{
            type: "floor",
            config: {
              floorType: "standable",
              scenery: "blacktooth",
              times: { x: 1, y: 1 },
            },
          }}
        >
          <span
            className={`sprite texture-blacktooth_floor ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Player</BitmapText>
        <ItemToolButton
          itemTool={{
            type: "player",
            config: { which: "head" },
          }}
          tooltipContent={`## Head

Place on of these into one room

This is where head will start the game`}
        >
          <span
            className={`sprite texture-head_walking_towards_2 [button:hover_&]:texture-animated-head_walking_right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "player",
            config: { which: "heels" },
          }}
          tooltipContent={`## Heels

Place on of these into one room

This is where head will start the game`}
        >
          <span
            className={`sprite texture-heels_walking_towards_2 [button:hover_&]:texture-animated-heels_walking_right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">NPC’s</BitmapText>
        <ItemToolButton
          itemTool={{
            type: "sceneryPlayer",
            config: { which: "head", startDirection: "towards" },
          }}
        >
          <span
            className={`sprite texture-head_walking_towards_2 [button:hover_&]:texture-animated-head_walking_right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "sceneryPlayer",
            config: { which: "heels", startDirection: "towards" },
          }}
        >
          <span
            className={`sprite texture-heels_walking_towards_2 [button:hover_&]:texture-animated-heels_walking_right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "sceneryPlayer",
            config: { which: "headOverHeels", startDirection: "towards" },
          }}
        >
          <StackedToolbarIcons
            topClasses="texture-head_walking_towards_2 [button:hover_&]:texture-animated-head_walking_right"
            bottomClasses="texture-heels_walking_towards_2 [button:hover_&]:texture-animated-heels_walking_right"
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full pt-2">debug</BitmapText>
        <ShowBoundingBoxSelect />
      </div>
    </div>
  );
};
