import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";

export type SaveIconProps = {
  /** colours the arrow */
  arrowClass: string;
};

/** an arrow into a floppy disk */
export const SaveIcon = ({ arrowClass }: SaveIconProps) => (
  <div class="flex flex-row items-center">
    <span class={`text-single-line ${arrowClass}`}>➡</span>
    <span
      class={`sprite ${"texture-editor_tool_save" satisfies TextureTailwindClass} relative`}
    />
  </div>
);
