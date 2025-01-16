import { useGameApi } from "@/game/components/GameApiContext";
import { useEffect } from "react";
import { useInputAssignment } from "../selectors";

export const useGiveStoreKeyAssignmentToGame = () => {
  const gameApi = useGameApi();
  const inputAssignment = useInputAssignment();

  useEffect(
    function setRenderOptionsOnGameApi() {
      gameApi.gameState.inputAssignment = inputAssignment;
    },
    [gameApi, inputAssignment],
  );
};
