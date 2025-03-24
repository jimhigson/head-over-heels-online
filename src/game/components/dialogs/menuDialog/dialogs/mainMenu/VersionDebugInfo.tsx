import { useState } from "react";
import { BitmapText } from "../../../../Sprite";

export const VersionDebugInfo = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(true)}
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
