import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { showScroll } from "../gameMenusSlice";
import { useGameApi } from "../../game/components/GameApiContext";

export const useOpenScrolls = () => {
  const dispatch = useAppDispatch();
  const gameApi = useGameApi();

  useEffect(
    function openScrollDialogOnScrollOpenedEvent() {
      const handleScrollOpened = ({ markdown }: { markdown: string }) => {
        dispatch(showScroll(markdown));
      };

      gameApi.events.on("scrollOpened", handleScrollOpened);

      return () => {
        gameApi.events.off("scrollOpened", handleScrollOpened);
      };
    },
    [dispatch, gameApi],
  );
};
