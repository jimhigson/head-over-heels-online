import { useState, useEffect } from "react";
import type { GameApi } from "../GameApi";
import type { InputState } from "../input/InputState";
import { GameDialog } from "./GameDialog";
import { ScrollContent } from "./ScrollContent";
import type { ItemInPlayConfig } from "@/model/ItemInPlay";
import { HoldBanner } from "./HoldBanner";

export type GameOverlayDialogsProps<RoomId extends string> = {
  gameApi: GameApi<RoomId>;
};

type ScrollConfig = ItemInPlayConfig<"scroll">;

export const GameOverlayDialogs = <RoomId extends string>({
  gameApi,
}: GameOverlayDialogsProps<RoomId>) => {
  const [displayedScrollContent, setDisplayedScrollContent] =
    useState<ScrollConfig | null>(null);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(
    function listenForScrollOpen() {
      const handleScrollOpened = (scrollContent: ScrollConfig) => {
        setDisplayedScrollContent(scrollContent);
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
    displayedScrollContent !== null ?
      <GameDialog
        content={
          <ScrollContent
            content={displayedScrollContent}
            keyAssignment={gameApi.gameState.keyAssignment}
          />
        }
      />
    : paused ?
      <GameDialog
        content={<HoldBanner keyAssignment={gameApi.gameState.keyAssignment} />}
      />
    : null
  );
};
