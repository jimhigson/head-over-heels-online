import { BlockyMarkdown } from "./BlockyMarkdown";
import { PressToContinue } from "./PressToContinue";
import type { KeyAssignment } from "../input/InputState";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { textScale } from "./dialogScales";

export type ScrollContentProps = {
  markdown: string;
  keyAssignment: KeyAssignment;
};

export const ScrollContent = ({
  markdown,
  keyAssignment,
}: ScrollContentProps) => {
  return (
    <div className="bg-highlightBeige">
      <BlockyMarkdown
        className={`p-${textScale} pb-0`}
        markdown={markdown}
      ></BlockyMarkdown>
      <PressToContinue
        className={`px-${textScale} sticky bottom-0 bg-lightBeige`}
        action="jump"
        keyAssignment={keyAssignment}
        keyColor={spritesheetPalette.midRed}
      />
    </div>
  );
};
