import { emptyArray, emptyObject } from "../utils/empty";
import { ItemButton } from "./ItemButton";

export const LevelEditorToolbar = () => {
  return (
    <div className="fixed flex top-1 right-1 bg-metallicBlueHalfbrite p-half gap-half w-24 flex-wrap justify-start">
      <ItemButton
        type="monster"
        config={{
          which: "dalek",
          movement: "patrol-randomly-diagonal",
          activated: "on",
        }}
      />
      <ItemButton
        type="monster"
        config={{
          which: "turtle",
          activated: "on",
          movement: "clockwise",
          startDirection: "towards",
        }}
      />
      <ItemButton
        type="monster"
        config={{
          which: "elephantHead",
          activated: "on",
          movement: "unmoving",
          startDirection: "towards",
        }}
      />
      <ItemButton
        type="monster"
        config={{
          which: "skiHead",
          style: "greenAndPink",
          activated: "on",
          movement: "back-forth",
          startDirection: "towards",
        }}
      />
      <ItemButton type="block" config={{ style: "artificial" }} />
      <ItemButton type="block" config={{ style: "organic" }} />
      <ItemButton type="block" config={{ style: "book" }} />
      <ItemButton type="charles" config={emptyObject} />
      <ItemButton
        type="switch"
        config={{
          initialSetting: "left",
          type: "in-room",
          modifies: emptyArray,
        }}
      />
      <ItemButton type="ball" config={emptyObject} />
    </div>
  );
};
