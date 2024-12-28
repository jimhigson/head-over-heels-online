import { BitmapText } from "./Sprite";
import { PressToContinue } from "./PressToContinue";
import type { KeyAssignment } from "../input/InputState";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { ScaleFactorContext } from "./ScaleFactorContext";
import { useContext } from "react";

export const HoldBanner = ({
  keyAssignment,
}: {
  keyAssignment: KeyAssignment;
}) => {
  const scaleFactor = useContext(ScaleFactorContext);

  return (
    <div className="text-center bg-pureBlack">
      <div>
        <BitmapText
          scale={scaleFactor}
          doubleHeight
          color={spritesheetPalette.moss}
        >
          hold
        </BitmapText>
      </div>
      <span>
        <PressToContinue
          className="text-center"
          action="hold"
          keyAssignment={keyAssignment}
        />
      </span>
    </div>
  );
};
