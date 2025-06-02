import { ShowBoundingBoxSwitches } from "../../game/components/cheats/ShowBoundingBoxSwitches";
import type { JsonItemConfig } from "../../model/json/JsonItem";
import { emptyArray, emptyObject } from "../../utils/empty";
import { originXyz } from "../../utils/vectors/vectors";
import type { EditorRoomId, EditorRoomItemId } from "../EditorRoomId";
import { ItemToolButton } from "./ItemToolButton";
import { PointerToolButton } from "./PointerToolButton";
import { RoomColourSelect } from "./RoomColourSelect";
import { RoomScenerySelect } from "./RoomScenerySelect";

export const LevelEditorToolbar = () => {
  return (
    <div className="fixed flex top-1 right-1 bg-metallicBlueHalfbrite p-half gap-half w-24 flex-wrap justify-start">
      <RoomScenerySelect />
      <RoomColourSelect />
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
      />
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
      />
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
      />
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
      />
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
      />
      <ItemToolButton
        itemTool={{ type: "block", config: { style: "artificial" } }}
      />
      <ItemToolButton
        itemTool={{ type: "lift", config: { top: 11, bottom: 0 } }}
      />
      <ItemToolButton itemTool={{ type: "barrier", config: { axis: "x" } }} />
      <ItemToolButton
        itemTool={{ type: "block", config: { style: "organic" } }}
      />
      <ItemToolButton itemTool={{ type: "block", config: { style: "book" } }} />
      <ItemToolButton
        itemTool={{ type: "pickup", config: { gives: "extra-life" } }}
      />
      <ItemToolButton
        itemTool={{ type: "conveyor", config: { direction: "away" } }}
      />
      <ItemToolButton
        itemTool={{
          type: "teleporter",
          config: {
            toRoom: "(placeholder)" as EditorRoomId,
            toPosition: originXyz,
          },
        }}
      />
      <ItemToolButton itemTool={{ type: "charles", config: emptyObject }} />
      <ItemToolButton
        itemTool={{
          type: "joystick",
          config: { controls: ["(placeholder)"] as EditorRoomItemId[] },
        }}
      />
      <ItemToolButton
        itemTool={{
          type: "switch",
          config: {
            initialSetting: "left",
            type: "in-room",
            modifies: emptyArray,
          },
        }}
      />
      <ItemToolButton itemTool={{ type: "ball", config: emptyObject }} />
      <ItemToolButton
        itemTool={{ type: "portableBlock", config: { style: "cube" } }}
      />
      <ItemToolButton
        itemTool={{ type: "pushableBlock", config: { style: "stepStool" } }}
      />
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
      />
      <ItemToolButton itemTool={{ type: "spikes", config: emptyObject }} />
      <ItemToolButton
        itemTool={{ type: "deadlyBlock", config: { style: "volcano" } }}
      />
      <ItemToolButton
        itemTool={{
          type: "slidingDeadly",
          config: { style: "spikyBall", startingPhase: 1 },
        }}
      />
      {/* need a better way to do non-config here - none of this really makes sense */}
      <ItemToolButton
        itemTool={{
          type: "door",
          config: {
            direction: "away", // arbitrary, to be corrected on placement
            toRoom: "(placeholder)" as EditorRoomId, // arbitrary, to be corrected on placement
          } satisfies JsonItemConfig<"door", EditorRoomId, EditorRoomItemId>,
        }}
      />
      <ShowBoundingBoxSwitches />
    </div>
  );
};
