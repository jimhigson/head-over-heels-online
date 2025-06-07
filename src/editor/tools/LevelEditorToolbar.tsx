import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import type { JsonItemConfig } from "../../model/json/JsonItem";
import { emptyArray, emptyObject } from "../../utils/empty";
import { originXyz } from "../../utils/vectors/vectors";
import type { EditorRoomId, EditorRoomItemId } from "../EditorRoomId";
import { twClass } from "../twClass";
import { ItemToolButton } from "./ItemToolButton";
import { PointerToolButton } from "./PointerToolButton";
import { RoomColourSelect } from "./RoomColourSelect";
import { RoomScenerySelect } from "./RoomScenerySelect";

const buttonSpriteClasses = twClass(
  "[button:not([data-isCurrentTool=true]):not(:hover)_&]:sprite-revert-to-two-tone",
);

export const LevelEditorToolbar = () => {
  return (
    <div className="flex fixed top-0 right-0 w-14 text-white bg-metallicBlueHalfbrite p-half gap-oneScaledPix flex-wrap justify-start">
      <RoomScenerySelect />
      <RoomColourSelect />
      <div className="flex flex-wrap gap-oneScaledPix">
        <PointerToolButton />
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
          itemTool={{ type: "block", config: { style: "artificial" } }}
        >
          <span
            className={`sprite texture-block.artificial ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
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
        <ItemToolButton itemTool={{ type: "barrier", config: { axis: "x" } }}>
          <span className={`sprite texture-barrier.x ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "block", config: { style: "organic" } }}
        >
          <span
            className={`sprite texture-block.organic ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
        <ItemToolButton itemTool={{ type: "block", config: { style: "book" } }}>
          <span className={`sprite texture-book.x ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "pickup", config: { gives: "extra-life" } }}
        >
          <span
            className={`sprite texture-whiteRabbit ${buttonSpriteClasses}`}
          />
        </ItemToolButton>
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
        <ItemToolButton
          itemTool={{ type: "portableBlock", config: { style: "cube" } }}
        >
          <span className={`sprite texture-cube ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{ type: "pushableBlock", config: { style: "stepStool" } }}
        >
          <span className={`sprite texture-stepStool ${buttonSpriteClasses}`} />
        </ItemToolButton>
        <ItemToolButton
          itemTool={{
            type: "movingPlatform",
            config: {
              style: "sandwich",
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
        <ItemToolButton
          itemTool={{ type: "deadlyBlock", config: { style: "volcano" } }}
        >
          <span
            className={`sprite texture-volcano.1 [button:hover_&]:texture-animated-volcano ${buttonSpriteClasses}`}
          />
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
        {/* need a better way to do non-config here - none of this really makes sense */}
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
      </div>
      <div className="flex flex-row gap-1">
        <ShowBoundingBoxSelect />
      </div>
    </div>
  );
};
