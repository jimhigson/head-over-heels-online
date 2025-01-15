import { useGameApi } from "@/game/components/GameApiContext";
import { useEffect } from "react";
import { useKeyAssignment } from "../selectors";


export const useGiveStoreKeyAssignmentToGame = () => {
    const gameApi = useGameApi();
    const keyAssignment = useKeyAssignment();

    useEffect(
        function setRenderOptionsOnGameApi() {
            gameApi.gameState.keyAssignment = keyAssignment;
        },
        [gameApi, keyAssignment]
    );
};
