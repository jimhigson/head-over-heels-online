import { BlockyMarkdown } from "../BlockyMarkdown";
import { PressToContinueBanner } from "./PressToContinueBanner";
import type { InputState } from "../../input/InputState";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { useContext, useEffect } from "react";
import { ScaleFactorContext } from "../ScaleFactorContext";
import type { GameApi } from "@/game/GameApi";

export type ScrollContentProps<RoomId extends string> = {
  markdown: string;
  gameApi: GameApi<RoomId>;
  /** callback for when this dialog wants to close itself */
  onClose: () => void;
};

export const ScrollDialogContent = <RoomId extends string>({
  markdown,
  gameApi,
  onClose,
}: ScrollContentProps<RoomId>) => {
  const scaleFactor = useContext(ScaleFactorContext);
  // technically this is wrong - if the key assignment changes, this component won't re-render
  // but this is probably not possible during the lifetime of this component
  const { keyAssignment } = gameApi.gameState;

  useEffect(
    function closeOnJumpPressed() {
      const handleInput = (inputState: InputState) => {
        if (inputState.jump) {
          onClose();
          inputState.jump = false; // handled this input
        }
      };

      gameApi.events.on("inputStateChanged", handleInput);

      return () => {
        gameApi.events.off("inputStateChanged", handleInput);
      };
    },
    [gameApi, onClose],
  );

  return (
    <div className="bg-highlightBeige">
      <BlockyMarkdown
        className={`p-${scaleFactor} pb-0`}
        markdown={markdown}
      ></BlockyMarkdown>
      <PressToContinueBanner
        className={`px-${scaleFactor} sticky bottom-0 bg-lightBeige`}
        action="jump"
        keyAssignment={keyAssignment}
        keyColor={spritesheetPalette.midRed}
      />
    </div>
  );
};
