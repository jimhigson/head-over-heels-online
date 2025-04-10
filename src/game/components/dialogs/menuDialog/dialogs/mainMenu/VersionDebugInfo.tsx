import { useReducer } from "react";
import { BitmapText } from "../../../../tailwindSprites/Sprite";

export const VersionDebugInfo = () => {
  const [open, toggleOpen] = useReducer((o: boolean) => !o, false);

  return (
    <div
      onClick={toggleOpen}
      className="flex bg-metallicBlueHalfbrite text-metallicBlue justify-end absolute bottom-0 right-2 z-dialog"
    >
      {!open && <BitmapText>*</BitmapText>}
      {open && (
        <BitmapText>
          {__gitHash__ || ""}
          {__buildDate__ || ""}
        </BitmapText>
      )}
    </div>
  );
};
