import type { GameApi } from "@/game/GameApi";
import type { Action, InputState } from "@/game/input/InputState";
import { useEffect } from "react";

export type UseActionInputProps<RoomId extends string> = {
  onAction: () => void;
  gameApi: GameApi<RoomId>;
  action: Action;
};

export const useActionInput = <RoomId extends string>({
  onAction,
  gameApi,
  action,
}: UseActionInputProps<RoomId>) => {
  useEffect(
    function closeOnInput() {
      const handleInput = (inputState: InputState) => {
        console.log("handleInput", JSON.stringify(inputState));
        if (inputState[action]) {
          onAction();
          inputState[action] = false; // handled this input
        }
      };

      gameApi.events.on("inputStateChanged", handleInput);

      return () => {
        gameApi.events.off("inputStateChanged", handleInput);
      };
    },
    [action, gameApi, onAction],
  );
};
