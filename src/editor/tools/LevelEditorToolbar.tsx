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
import { ItemToolButton } from "./ItemToolButton";
import { MultipleToolButtons } from "./MultipleToolButtons";
import { PointerToolButton } from "./PointerToolButton";
import { RoomColourSelect } from "./RoomColourSelect";
import { RoomScenerySelect } from "./RoomScenerySelect";
import { UndoRedoButtons } from "./UndoRedoButtons";

const buttonSpriteClasses = twClass(
  "[button:not([data-iscurrenttool=true]):not(:hover)_&]:sprite-revert-to-two-tone",
);
const buttonGroupClassname = twClass("flex flex-wrap gap-oneScaledPix w-full");

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
            className={`sprite texture-dalek.1 [button:hover_&]:texture-animated-dalek" ${buttonSpriteClasses}`}
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
          <span
            className={`sprite texture-cyberman.towards [button:hover_&]:texture-cyberman.right ${buttonSpriteClasses}`}
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
            className={`sprite texture-skiHead.greenAndPink.towards [button:hover_&]:texture-skiHead.greenAndPink.right ${buttonSpriteClasses}`}
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
            className={`sprite texture-helicopterBug.1 [button:hover_&]:texture-animated-helicopterBug ${buttonSpriteClasses}`}
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
            className={`sprite texture-turtle.towards.1 [button:hover_&]:texture-animated-turtle.right ${buttonSpriteClasses}`}
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
            className={`sprite texture-headlessBase [button:hover_&]:texture-headlessBase.all ${buttonSpriteClasses}`}
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
          <span
            className={`sprite texture-computerBot.towards [button:hover_&]:texture-computerBot.right ${buttonSpriteClasses}`}
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
          <span
            className={`sprite texture-monkey.towards [button:hover_&]:texture-monkey.right ${buttonSpriteClasses}`}
          />
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
          className="inline relative"
        >
          <span
            className={`sprite inline-block absolute left-0 texture-headlessBase ${buttonSpriteClasses} [button:active_&]:top-oneScaledPix`}
          />
          <span
            className={`sprite inline-block absolute top-0 left-0 texture-elephant.towards [button:hover_&]:texture-elephant.right ${buttonSpriteClasses} [button:active_&]:top-oneScaledPix`}
          />
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
            className={`sprite texture-elephant.towards [button:hover_&]:texture-elephant.right ${buttonSpriteClasses}`}
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
          <span
            className={`sprite inline-block absolute left-0 texture-bubbles.cold.2 [button:hover_&]:texture-animated-bubbles.cold ${buttonSpriteClasses} [button:active_&]:top-oneScaledPix`}
          />
          <span
            className={`sprite inline-block absolute top-0 left-0 texture-ball [button:hover_&]:texture-ball ${buttonSpriteClasses} [button:active_&]:top-oneScaledPix`}
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
            className={`sprite texture-bubbles.cold.2 [button:hover_&]:texture-animated-bubbles.cold ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Blocks</BitmapText>
        <ItemToolButton
          itemTool={{ type: "block", config: { style: "artificial" } }}
        >
          <span
            className={`sprite texture-block.artificial ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "block", config: { style: "organic" } }}
        >
          <span
            className={`sprite texture-block.organic ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "block", config: { style: "tower" } }}
        >
          <span className={`sprite texture-tower ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "block", config: { style: "book" } }}>
          <span className={`sprite texture-book.x ${buttonSpriteClasses}`} />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">Pickups</BitmapText>
        <ItemToolButton
          itemTool={{ type: "pickup", config: { gives: "extra-life" } }}
        >
          <span
            className={`sprite texture-whiteRabbit ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "pickup", config: { gives: "bag" } }}>
          <span className={`sprite texture-bag ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "pickup",
            config: { gives: "hooter" },
          }}
        >
          <span className={`sprite texture-hooter ${buttonSpriteClasses}`} />
        </ItemToolButton>

        <ItemToolButton
          itemTool={{ type: "pickup", config: { gives: "doughnuts" } }}
        >
          <span className={`sprite texture-doughnuts ${buttonSpriteClasses}`} />
        </ItemToolButton>

        <ItemToolButton
          itemTool={{
            type: "pickup",
            config: { gives: "crown", planet: "blacktooth" },
          }}
        >
          <span
            className={`sprite texture-crown.blacktooth ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "pickup",
            config: { gives: "scroll", page: "blacktooth" },
          }}
        >
          <span className={`sprite texture-scroll ${buttonSpriteClasses}`} />
        </ItemToolButton>
      </div>
      <div className={buttonGroupClassname}>
        <BitmapText className="w-full">misc.</BitmapText>
        <ItemToolButton
          itemTool={{ type: "lift", config: { top: 11, bottom: 0 } }}
          className="inline relative"
        >
          <span
            className={`sprite inline-block absolute top-0 left-0 texture-lift.static ${buttonSpriteClasses} [button:active_&]:top-oneScaledPix`}
          />
          <span
            className={`sprite inline-block absolute top-0 left-0 texture-lift.1 [button:hover_&]:texture-animated-lift ${buttonSpriteClasses} [button:active_&]:top-oneScaledPix`}
          />
        </ItemToolButton>
        <MultipleToolButtons>
          <ItemToolButton itemTool={{ type: "barrier", config: { axis: "x" } }}>
            <span
              className={`sprite texture-barrier.x ${buttonSpriteClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton itemTool={{ type: "barrier", config: { axis: "y" } }}>
            <span
              className={`sprite texture-barrier.y ${buttonSpriteClasses}`}
            />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton
          itemTool={{ type: "conveyor", config: { direction: "away" } }}
        >
          <span
            className={`sprite texture-conveyor.y.1 [button:hover_&]:texture-animated-conveyor.x ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
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
            className={`sprite texture-teleporter ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "charles", config: emptyObject }}>
          <span
            className={`sprite texture-charles.towards [button:hover_&]:texture-charles.right ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "joystick",
            config: { controls: ["(placeholder)"] as EditorRoomItemId[] },
          }}
        >
          <span className={`sprite texture-joystick ${buttonSpriteClasses}`} />
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
            className={`sprite texture-switch.left [button:hover_&]:texture-switch.right ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "ball", config: emptyObject }}>
          <span className={`sprite texture-ball ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <MultipleToolButtons>
          <ItemToolButton
            itemTool={{ type: "portableBlock", config: { style: "cube" } }}
          >
            <span className={`sprite texture-cube ${buttonSpriteClasses}`} />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "portableBlock", config: { style: "drum" } }}
          >
            <span className={`sprite texture-drum ${buttonSpriteClasses}`} />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "portableBlock", config: { style: "sticks" } }}
          >
            <span className={`sprite texture-sticks ${buttonSpriteClasses}`} />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton itemTool={{ type: "pushableBlock", config: {} }}>
          <span className={`sprite texture-stepStool ${buttonSpriteClasses}`} />
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
          <span className={`sprite texture-sandwich ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "spikes", config: emptyObject }}>
          <span className={`sprite texture-spikes ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <MultipleToolButtons>
          <ItemToolButton
            itemTool={{ type: "deadlyBlock", config: { style: "volcano" } }}
          >
            <span
              className={`sprite texture-volcano.1 [button:hover_&]:texture-animated-volcano ${buttonSpriteClasses}`}
            />
          </ItemToolButton>
          <ItemToolButton
            itemTool={{ type: "deadlyBlock", config: { style: "toaster" } }}
          >
            <span
              className={`sprite texture-toaster.off ${buttonSpriteClasses}`}
            />
          </ItemToolButton>
        </MultipleToolButtons>
        <ItemToolButton
          itemTool={{
            type: "slidingBlock",
            config: { style: "puck" },
          }}
        >
          <span className={`sprite texture-puck ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "slidingDeadly",
            config: { style: "spikyBall", startingPhase: 1 },
          }}
        >
          <span
            className={`sprite texture-spikyBall.1 [button:hover_&]:texture-spikyBall.2 ${buttonSpriteClasses}`}
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
            className={`sprite texture-door.frame.generic.x.whole ${buttonSpriteClasses}`}
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
            className={`sprite texture-blacktooth.wall.plain.away ${buttonSpriteClasses}`}
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
            className={`sprite texture-head.walking.towards.2 [button:hover_&]:texture-animated-head.walking.right ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "player",
            config: { which: "heels" },
          }}
        >
          <span
            className={`sprite texture-heels.walking.towards.2 [button:hover_&]:texture-animated-heels.walking.right ${buttonSpriteClasses}`}
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
            className={`sprite texture-head.walking.towards.2 [button:hover_&]:texture-animated-head.walking.right ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "sceneryPlayer",
            config: { which: "heels", startDirection: "towards" },
          }}
        >
          <span
            className={`sprite texture-heels.walking.towards.2 [button:hover_&]:texture-animated-heels.walking.right ${buttonSpriteClasses}`}
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
