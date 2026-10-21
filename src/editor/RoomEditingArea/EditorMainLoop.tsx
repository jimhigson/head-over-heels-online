import { type RefObject } from "preact";

import { type Spritesheets } from "../../sprites/spritesheet/Spritesheets";
import { type EditorRoomRenderer } from "../editorTypes";
import { useEditorMainLoop } from "./useEditorMainLoop";

export type EditorMainLoopProps = {
  spritesheets: Spritesheets;
  /**
   * kept pointing at the current room renderer
   */
  roomRendererRef: RefObject<EditorRoomRenderer | undefined>;
};

/**
 * runs the room rendering - its own component, drawing nothing, since it
 * re-renders on every change to the loaded room and nothing else needs to
 */
export const EditorMainLoop = ({
  spritesheets,
  roomRendererRef,
}: EditorMainLoopProps) => {
  useEditorMainLoop(spritesheets, roomRendererRef);
  return null;
};
