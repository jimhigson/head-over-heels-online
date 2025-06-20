import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import type { JsonItemConfig } from "../../model/json/JsonItem";
import type { Wall } from "../../sprites/planets";
import { useAppDispatch } from "../../store/hooks";
import { RoomSelect } from "../../ui/RoomSelect";
import { emptyArray, emptyObject } from "../../utils/empty";
import { originXyz } from "../../utils/vectors/vectors";
import type { EditorRoomId, EditorRoomItemId } from "../EditorRoomId";
import {
  changeToRoom,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { twClass } from "../twClass";
import { HalfGridResolutionSwitch } from "./HalfGridResolutionSwitch";
import { ItemToolButton } from "./ItemToolButton";
import { MultipleToolButtons } from "./MultipleToolButtons";
import { PointerToolButton } from "./PointerToolButton";
import { RoomColourSelect } from "./RoomColourSelect";
import { RoomScenerySelect } from "./RoomScenerySelect";
import { UndoRedoButtons } from "./UndoRedoButtons";

const buttonSpriteRevertColourClasses = twClass(
  "[button:not([data-iscurrenttool=true]):not(:hover)_&]:sprite-revert-to-two-tone",
);
const buttonGroupClassname = twClass("flex flex-wrap gap-oneScaledPix w-full");

const StackedToolbarIcons = ({
  topClasses,
  bottomClasses = "texture-headlessBase",
}: {
  topClasses: string;
  bottomClasses?: string;
}) => {
  return (
    <div className="relative w-full h-full">
      <span
        className={`sprite absolute top-[calc(9px*var(--scale))] left-0 ${bottomClasses} ${buttonSpriteRevertColourClasses}`}
      />
      <span
        className={`sprite absolute top-[calc(-3px*var(--scale))] left-0 ${topClasses} ${buttonSpriteRevertColourClasses}`}
      />
    </div>
  );
};
const LabelledToolbarIcon = ({
  iconClasses,
  text,
}: {
  iconClasses: string;
  text: string;
}) => {
  return (
    <div className="relative w-full h-full">
      <span
        className={`sprite absolute top-0 left-0 ${iconClasses} ${buttonSpriteRevertColourClasses}`}
      />
      <BitmapText className="bg-metallicBlueHalfbrite absolute top-0 right-0 pl-oneScaledPix block">
        {text}
      </BitmapText>
    </div>
  );
};

export const LevelEditorToolbar = () => {
  const campaign = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.campaignInProgress,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex fixed top-0 bottom-0 right-0 w-12 box-content text-white bg-metallicBlueHalfbrite p-half gap-1 flex-wrap justify-start overflow-auto">
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Campaign</BitmapText>
        <RoomSelect
          campaign={campaign}
          onRoomSelect={(roomId) => {
            dispatch(changeToRoom(roomId));
          }}
        />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Room</BitmapText>
        <RoomScenerySelect />
        <RoomColourSelect />
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Edit</BitmapText>
        <PointerToolButton />
        <UndoRedoButtons />
        <HalfGridResolutionSwitch />
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
        >
          <span
            className={`sprite texture-dalek.1 [button:hover_&]:texture-animated-dalek" ${buttonSpriteRevertColourClasses}`}
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
        >
          <StackedToolbarIcons
            topClasses="texture-cyberman.towards [button:hover_&]:texture-cyberman.right"
            bottomClasses="texture-bubbles.cold.2 [button:hover_&]:texture-animated-bubbles.cold"
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
        >
          <span
            className={`sprite texture-skiHead.greenAndPink.towards [button:hover_&]:texture-skiHead.greenAndPink.right ${buttonSpriteRevertColourClasses}`}
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
            className={`sprite texture-helicopterBug.1 [button:hover_&]:texture-animated-helicopterBug ${buttonSpriteRevertColourClasses}`}
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
        >
          <span
            className={`sprite texture-turtle.towards.1 [button:hover_&]:texture-animated-turtle.right ${buttonSpriteRevertColourClasses}`}
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
        >
          <span
            className={`sprite texture-headlessBase [button:hover_&]:texture-headlessBase.all ${buttonSpriteRevertColourClasses}`}
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
        >
          <StackedToolbarIcons topClasses="texture-computerBot.towards [button:hover_&]:texture-computerBot.right" />
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
          <StackedToolbarIcons topClasses="texture-monkey.towards [button:hover_&]:texture-monkey.right" />
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
          <StackedToolbarIcons topClasses="texture-elephant.towards [button:hover_&]:texture-elephant.right" />
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
        >
          <span
            className={`sprite texture-elephant.towards [button:hover_&]:texture-elephant.right ${buttonSpriteRevertColourClasses}`}
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
        >
          <StackedToolbarIcons
            topClasses="texture-ball"
            bottomClasses="texture-bubbles.cold.2 [button:hover_&]:texture-animated-bubbles.cold"
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
        >
          <span
            className={`sprite texture-bubbles.cold.2 [button:hover_&]:texture-animated-bubbles.cold ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Blocks</BitmapText>
        <ItemToolButton
          itemTool={{ type: "block", config: { style: "artificial" } }}
        >
          <span
            className={`sprite texture-block.artificial ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "block", config: { style: "organic" } }}
        >
          <span
            className={`sprite texture-block.organic ${buttonSpriteRevertColourClasses}`}
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
            className={`sprite texture-book.x ${buttonSpriteRevertColourClasses}`}
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
          itemTool={{
            type: "pickup",
            config: { gives: "crown", planet: "blacktooth" },
          }}
        >
          <span
            className={`sprite texture-crown.blacktooth ${buttonSpriteRevertColourClasses}`}
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
        <BitmapText className="w-full">misc.</BitmapText>
        <ItemToolButton
          itemTool={{ type: "lift", config: { top: 11, bottom: 0 } }}
          className="inline relative"
        >
          <span
            className={`sprite inline-block absolute top-0 left-0 texture-lift.static ${buttonSpriteRevertColourClasses} [button:active_&]:top-oneScaledPix`}
          />
          <span
            className={`sprite inline-block absolute top-0 left-0 texture-lift.1 [button:hover_&]:texture-animated-lift ${buttonSpriteRevertColourClasses} [button:active_&]:top-oneScaledPix`}
          />
        </ItemToolButton>
        <MultipleToolButtons>
          <ItemToolButton itemTool={{ type: "barrier", config: { axis: "x" } }}>
            <span
              className={`sprite texture-barrier.x ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton itemTool={{ type: "barrier", config: { axis: "y" } }}>
            <span
              className={`sprite texture-barrier.y ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
        </MultipleToolButtons>
        <MultipleToolButtons>
          <ItemToolButton
            itemTool={{ type: "conveyor", config: { direction: "away" } }}
          >
            <LabelledToolbarIcon
              iconClasses="texture-conveyor.y.1 [button:hover_&]:texture-animated-conveyor.y"
              text="↗"
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "conveyor", config: { direction: "towards" } }}
          >
            <LabelledToolbarIcon
              iconClasses="texture-conveyor.y.1 [button:hover_&]:texture-animated-reversed-conveyor.y"
              text="↙"
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "conveyor", config: { direction: "left" } }}
          >
            <LabelledToolbarIcon
              iconClasses="texture-conveyor.x.1 [button:hover_&]:texture-animated-conveyor.x"
              text="↖"
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "conveyor", config: { direction: "right" } }}
          >
            <LabelledToolbarIcon
              iconClasses="texture-conveyor.x.1 [button:hover_&]:texture-animated-reversed-conveyor.x"
              text="↘"
            />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton
          itemTool={{
            type: "teleporter",
            config: {
              toRoom: "(placeholder)" as EditorRoomId,
              toPosition: originXyz,
            },
          }}
        >
          <span
            className={`sprite texture-teleporter ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "charles", config: emptyObject }}>
          <StackedToolbarIcons topClasses="texture-charles.towards [button:hover_&]:texture-charles.right" />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "joystick",
            config: { controls: ["(placeholder)"] as EditorRoomItemId[] },
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
            className={`sprite texture-switch.left [button:hover_&]:texture-switch.right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "ball", config: emptyObject }}>
          <span
            className={`sprite texture-ball ${buttonSpriteRevertColourClasses}`}
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
        <ItemToolButton
          itemTool={{
            type: "movingPlatform",
            config: {
              movement: "clockwise",
              activated: "on",
              startDirection: "towards",
            },
          }}
        >
          <span
            className={`sprite texture-sandwich ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "spikes", config: emptyObject }}>
          <span
            className={`sprite texture-spikes ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <MultipleToolButtons>
          <ItemToolButton
            itemTool={{ type: "deadlyBlock", config: { style: "volcano" } }}
          >
            <span
              className={`sprite texture-volcano.1 [button:hover_&]:texture-animated-volcano ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "deadlyBlock", config: { style: "toaster" } }}
          >
            <span
              className={`sprite texture-toaster.off ${buttonSpriteRevertColourClasses}`}
            />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton
          itemTool={{
            type: "slidingBlock",
            config: { style: "puck" },
          }}
        >
          <span
            className={`sprite texture-puck ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "slidingDeadly",
            config: { style: "spikyBall", startingPhase: 1 },
          }}
        >
          <span
            className={`sprite texture-spikyBall.1 [button:hover_&]:texture-spikyBall.2 ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Structure</BitmapText>
        <ItemToolButton
          itemTool={{
            type: "door",
            config: {
              direction: "away", // arbitrary, to be corrected on placement
              toRoom: "(placeholder)" as EditorRoomId, // arbitrary, to be corrected on placement
            } satisfies JsonItemConfig<"door", EditorRoomId, EditorRoomItemId>,
          }}
        >
          <span
            className={`sprite texture-door.frame.generic.x.whole ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "wall",
            config: {
              direction: "away", // arbitrary, to be corrected on placement
              tiles: ["plain"] as Wall<"blacktooth">[],
            },
          }}
        >
          <span
            className={`sprite texture-blacktooth.wall.plain.away ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
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
            className={`sprite texture-blacktooth.floor ${buttonSpriteRevertColourClasses}`}
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
        >
          <span
            className={`sprite texture-head.walking.towards.2 [button:hover_&]:texture-animated-head.walking.right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "player",
            config: { which: "heels" },
          }}
        >
          <span
            className={`sprite texture-heels.walking.towards.2 [button:hover_&]:texture-animated-heels.walking.right ${buttonSpriteRevertColourClasses}`}
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
            className={`sprite texture-head.walking.towards.2 [button:hover_&]:texture-animated-head.walking.right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "sceneryPlayer",
            config: { which: "heels", startDirection: "towards" },
          }}
        >
          <span
            className={`sprite texture-heels.walking.towards.2 [button:hover_&]:texture-animated-heels.walking.right ${buttonSpriteRevertColourClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "sceneryPlayer",
            config: { which: "headOverHeels", startDirection: "towards" },
          }}
        >
          <StackedToolbarIcons
            topClasses="texture-head.walking.towards.2 [button:hover_&]:texture-animated-head.walking.right"
            bottomClasses="texture-heels.walking.towards.2 [button:hover_&]:texture-animated-heels.walking.right"
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">debug</BitmapText>
        <ShowBoundingBoxSelect />
      </div>
    </div>
  );
};
