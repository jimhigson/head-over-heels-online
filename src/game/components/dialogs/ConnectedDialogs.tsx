import { useState, useEffect } from "react";
import type { GameApi } from "../../GameApi";
import type { InputState } from "../../input/InputState";
import { ScrollDialogContent } from "./ScrollDialogContent";
import { HoldDialogContent } from "./HoldDialogContent";
import { Dialog } from "@/components/ui/dialog";

export type ConnectedDialogsProps<RoomId extends string> = {
  gameApi: GameApi<RoomId>;
};

export const ConnectedDialogs = <RoomId extends string>({
  gameApi,
}: ConnectedDialogsProps<RoomId>) => {
  const [displayedScrollContent, setDisplayedScrollContent] = useState<
    string | null
  >(null);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(
    function showScrollOnScrollOpenedEvent() {
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
      const showHoldDialogOnHoldPressed = (inputState: InputState) => {
        if (
          (inputState.hold || inputState.windowFocus === false) &&
          !paused &&
          displayedScrollContent === null
        ) {
          setPaused(true);
          gameApi.gameState.gameSpeed = 0;
          inputState.hold = false; // handled this input
        }
      };

      gameApi.events.on("inputStateChanged", showHoldDialogOnHoldPressed);

      return () => {
        gameApi.events.off("inputStateChanged", showHoldDialogOnHoldPressed);
      };
    },
    [gameApi, paused, displayedScrollContent],
  );

  return (
    <>
      {displayedScrollContent !== null ?
        <Dialog>
          <ScrollDialogContent
            markdown={displayedScrollContent}
            gameApi={gameApi}
            onClose={() => {
              setDisplayedScrollContent(null);
              gameApi.gameState.gameSpeed = 1;
            }}
          />
        </Dialog>
      : paused ?
        <Dialog>
          <HoldDialogContent
            gameApi={gameApi}
            onClose={() => {
              setPaused(false);
              gameApi.gameState.gameSpeed = 1;
            }}
          />
        </Dialog>
      : null}
    </>
  );
};
