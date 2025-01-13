import { useState, useEffect } from "react";
import type { GameApi } from "../../GameApi";
import type { InputState } from "../../input/InputState";
import { ScrollContent } from "./ScrollContent";
import { HoldBanner } from "../HoldBanner";
import { Dialog } from "@/components/ui/dialog";

export type GameOverlayDialogsProps<RoomId extends string> = {
  gameApi: GameApi<RoomId>;
};

export const GameOverlayDialogs = <RoomId extends string>({
  gameApi,
}: GameOverlayDialogsProps<RoomId>) => {
  const [displayedScrollContent, setDisplayedScrollContent] = useState<
    string | null
  >(null);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(
    function listenForScrollOpen() {
      const handleScrollOpened = ({ markdown }: { markdown: string }) => {
        setDisplayedScrollContent(markdown);
        gameApi.gameState.gameSpeed = 0;
      };

      gameApi.events.on("scrollOpened", handleScrollOpened);

      return () => {
        gameApi.events.off("scrollOpened", handleScrollOpened);
      };
    },
    [gameApi],
  );

  useEffect(
    function listenForInput() {
      const handleInput = (inputState: InputState) => {
        if (displayedScrollContent !== null && inputState.jump) {
          // close the scroll
          setDisplayedScrollContent(null);
          gameApi.gameState.gameSpeed = 1;
          inputState.jump = false; // handled this input
        }

        //pausing
        if (
          (inputState.hold || inputState.windowFocus === false) &&
          !paused &&
          displayedScrollContent === null
        ) {
          setPaused(true);
          gameApi.gameState.gameSpeed = 0;
          inputState.hold = false; // handled this input
        }
        //un pausing
        if (inputState.hold && paused) {
          setPaused(false);
          gameApi.gameState.gameSpeed = 1;
          inputState.hold = false; // handled this input
        }
      };

      gameApi.events.on("inputStateChanged", handleInput);

      return () => {
        gameApi.events.off("inputStateChanged", handleInput);
      };
    },
    [gameApi, paused, displayedScrollContent],
  );

  return (
    <>
      {displayedScrollContent !== null ?
        <Dialog>
          <ScrollContent
            markdown={displayedScrollContent}
            keyAssignment={gameApi.gameState.keyAssignment}
          />
        </Dialog>
      : paused ?
        <Dialog>
          <HoldBanner keyAssignment={gameApi.gameState.keyAssignment} />
        </Dialog>
      : null}
    </>
  );
};
