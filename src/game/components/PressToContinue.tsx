import { spritesheetPalette } from "@/sprites/samplePalette";
import { BitmapText } from "./Sprite";
import type { Action, KeyAssignment } from "../input/InputState";
import { Fragment } from "react/jsx-runtime";
import { textScale } from "./dialogScales";

export const PressToContinue = ({
  action,
  keyAssignment,
}: {
  action: Action;
  keyAssignment: KeyAssignment;
}) => {
  const keys = keyAssignment[action];

  const textColor = spritesheetPalette().metallicBlue;
  const keyColor = spritesheetPalette().pink;

  return (
    <div className={`text-center mt-${textScale * 2}`}>
      <BitmapText scale={4} color={textColor}>
        Press
      </BitmapText>
      <BitmapText scale={4} color={keyColor}>
        {action}
      </BitmapText>
      <BitmapText scale={4} color={spritesheetPalette().metallicBlue}>
        to continue
      </BitmapText>
      <div>
        <BitmapText scale={4} color={textColor}>
          (
        </BitmapText>
        {keys.map((k, i) => (
          <Fragment key={k}>
            <BitmapText scale={4} color={keyColor}>
              {k === " " ? "space" : k}
            </BitmapText>
            {i < keys.length - 1 && (
              <BitmapText scale={4} color={textColor}>
                /
              </BitmapText>
            )}
          </Fragment>
        ))}
        <BitmapText scale={4} color={spritesheetPalette().metallicBlue}>
          )
        </BitmapText>
      </div>
    </div>
  );
};
