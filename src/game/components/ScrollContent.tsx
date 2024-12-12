import { BlockyMarkdown } from "./BlockyMarkdown";
import { textScale } from "./dialogScales";
import { PressToContinue } from "./PressToContinue";
import type { KeyAssignment } from "../input/InputState";
import { spritesheetPalette } from "gfx/spritesheetPalette";

export type ScrollContentProps = {
  markdown: string;
  keyAssignment: KeyAssignment;
};

export const ScrollContent = ({
  markdown,
  keyAssignment,
}: ScrollContentProps) => {
  return (
    <div className={`p-${textScale} pb-0 bg-highlightBeige`}>
      <BlockyMarkdown markdown={markdown}></BlockyMarkdown>
      <PressToContinue
        className={`sticky bottom-0 bg-lightBeige`}
        action="jump"
        keyAssignment={keyAssignment}
        keyColor={spritesheetPalette.midRed}
      />
    </div>
  );
};
