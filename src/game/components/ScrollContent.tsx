import { BlockyMarkdown } from "./BlockyMarkdown";
import { textScale } from "./dialogScales";
import { PressToContinue } from "./PressToContinue";
import type { KeyAssignment } from "../input/InputState";

export type ScrollContentProps = {
  markdown: string;
  keyAssignment: KeyAssignment;
};

export const ScrollContent = ({
  markdown,
  keyAssignment,
}: ScrollContentProps) => {
  return (
    <div className={`p-${textScale} bg-highlightBeige`}>
      <BlockyMarkdown markdown={markdown}></BlockyMarkdown>
      <PressToContinue action="jump" keyAssignment={keyAssignment} />
    </div>
  );
};