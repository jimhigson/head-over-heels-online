import type { ItemInPlayConfig } from "@/model/ItemInPlay";
import { spritesheetPalette } from "@/sprites/samplePalette";
import { BlockyMarkdown } from "./BlockyMarkdown";
import { textScale } from "./dialogScales";
import { PressToContinue } from "./PressToContinue";
import type { KeyAssignment } from "../input/InputState";

type ScrollConfig = ItemInPlayConfig<"scroll">;

export type ScrollContentProps = {
  content: ScrollConfig;
  keyAssignment: KeyAssignment;
};

export const ScrollContent = ({
  content,
  keyAssignment,
}: ScrollContentProps) => {
  return (
    <div
      className={`p-${textScale}`}
      style={{
        backgroundColor: spritesheetPalette().highlightBeige.toRgbaString(),
      }}
    >
      <BlockyMarkdown markdown={content.text}></BlockyMarkdown>
      <PressToContinue action="jump" keyAssignment={keyAssignment} />
    </div>
  );
};
