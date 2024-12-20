import { BlockyMarkdown } from "./BlockyMarkdown";
import { PressToContinue } from "./PressToContinue";
import type { KeyAssignment } from "../input/InputState";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { useContext } from "react";
import { ScaleFactorContext } from "./GameOverlayDialogs";

export type ScrollContentProps = {
  markdown: string;
  keyAssignment: KeyAssignment;
};

export const ScrollContent = ({
  markdown,
  keyAssignment,
}: ScrollContentProps) => {
  const scaleFactor = useContext(ScaleFactorContext);

  return (
    <div className="bg-highlightBeige">
      <BlockyMarkdown
        className={`p-${scaleFactor} pb-0`}
        markdown={markdown}
      ></BlockyMarkdown>
      <PressToContinue
        className={`px-${scaleFactor} sticky bottom-0 bg-lightBeige`}
        action="jump"
        keyAssignment={keyAssignment}
        keyColor={spritesheetPalette.midRed}
      />
    </div>
  );
};
