import type { GameApi } from "@/game/GameApi";
import type { Action, InputState } from "@/game/input/InputState";
import { useEffect } from "react";

export type UseCloseOnInputProps<RoomId extends string> = {
  onClose: () => void;
  gameApi: GameApi<RoomId>;
  action: Action;
};

export const useCloseOnInput = <RoomId extends string>({
  onClose,
  gameApi,
  action,
}: UseCloseOnInputProps<RoomId>) => {
  useEffect(
    function closeOnInput() {
      const handleInput = (inputState: InputState) => {
        console.log("handleInput", JSON.stringify(inputState));
        if (inputState[action]) {
          onClose();
          inputState[action] = false; // handled this input
        }
      };

      gameApi.events.on("inputStateChanged", handleInput);

      return () => {
        gameApi.events.off("inputStateChanged", handleInput);
      };
    },
    [action, gameApi, onClose],
  );
};
