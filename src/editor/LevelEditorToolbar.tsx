import type { JsonItemConfig } from "../model/json/JsonItem";
import { emptyArray, emptyObject } from "../utils/empty";
import type { EditorRoomId, EditorRoomItemId } from "./EditorRoomId";
import { ItemToolButton } from "./ItemToolButton";

export const LevelEditorToolbar = () => {
  return (
    <div className="fixed flex top-1 right-1 bg-metallicBlueHalfbrite p-half gap-half w-24 flex-wrap justify-start">
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
            movement: "unmoving",
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
        itemTool={{ type: "block", config: { style: "artificial" } }}
      />
      <ItemToolButton
        itemTool={{ type: "block", config: { style: "organic" } }}
      />
      <ItemToolButton itemTool={{ type: "block", config: { style: "book" } }} />
      <ItemToolButton itemTool={{ type: "charles", config: emptyObject }} />
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
      {/* need a better way to do non-config here - none of this really makes sense */}
      <ItemToolButton
        itemTool={{
          type: "door",
          config:
            // TODO: this cast is really nasty! Need a better way to handle this.
            emptyObject as unknown as JsonItemConfig<
              "door",
              EditorRoomId,
              EditorRoomItemId
            >,
        }}
      />
    </div>
  );
};
