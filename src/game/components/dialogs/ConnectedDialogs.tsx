import { useState, useEffect } from "react";
import type { GameApi } from "../../GameApi";
import type { InputState } from "../../input/InputState";
import { ScrollDialogContent } from "./ScrollDialogContent";
import { HoldDialogContent } from "./HoldDialogContent";
import { Dialog } from "@/components/ui/dialog";
import { MenuDialogContent } from "./MenuDialogContent";

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(
    function openScrollDialogOnScrollOpenedEvent() {
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
    function openDialogsOnInput() {
      const openOnInput = (inputState: InputState) => {
        if (
          (inputState.hold || inputState.windowFocus === false) &&
          !paused &&
          !menuOpen &&
          displayedScrollContent === null
        ) {
          setPaused(true);
          gameApi.gameState.gameSpeed = 0;
          inputState.hold = false; // handled this input
        }

        if (inputState.menu && !menuOpen) {
          setMenuOpen(true);
          // clear other dialogs:
          setPaused(false);
          setDisplayedScrollContent(null);
          gameApi.gameState.gameSpeed = 0;
          inputState.menu = false; // handled this input
        }
      };

      gameApi.events.on("inputStateChanged", openOnInput);

      return () => {
        gameApi.events.off("inputStateChanged", openOnInput);
      };
    },
    [gameApi, paused, displayedScrollContent, menuOpen],
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
      {menuOpen ?
        <Dialog>
          <MenuDialogContent
            gameApi={gameApi}
            onClose={() => {
              setMenuOpen(false);
              gameApi.gameState.gameSpeed = 1;
            }}
          />
        </Dialog>
      : null}
    </>
  );
};
