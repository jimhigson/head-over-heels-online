import { BitmapText } from "./Sprite";
import { textScale } from "./dialogScales";
import { PressToContinue } from "./PressToContinue";
import type { KeyAssignment } from "../input/InputState";
import { spritesheetPalette } from "gfx/spritesheetPalette";

export const HoldBanner = ({
  keyAssignment,
}: {
  keyAssignment: KeyAssignment;
}) => {
  return (
    <div className="text-center bg-black">
      <div>
        <BitmapText
          scale={textScale}
          doubleHeight
          color={spritesheetPalette.moss}
        >
          hold
        </BitmapText>
      </div>
      <span>
        <PressToContinue action="hold" keyAssignment={keyAssignment} />
      </span>
    </div>
  );
};
