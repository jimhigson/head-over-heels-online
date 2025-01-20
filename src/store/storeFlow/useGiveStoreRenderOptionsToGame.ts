import { useEffect } from "react";
import { useRenderOptions } from "../selectors";
import { useGameApi } from "../../game/components/GameApiContext";

export const useGiveStoreRenderOptionsToGame = () => {
  const gameApi = useGameApi();
  const renderOptions = useRenderOptions();

  useEffect(
    function setRenderOptionsOnGameApi() {
      gameApi.renderOptions = renderOptions;
    },
    [gameApi, renderOptions],
  );
};
