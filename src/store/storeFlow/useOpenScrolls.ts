import { useAppDispatch } from "../hooks";
import { showScroll } from "../gameMenusSlice";
import { useGameApi } from "../../game/components/GameApiContext";
import { useEvent } from "../../utils/react/useEvent";
import { useCallback } from "react";

export const useOpenScrolls = () => {
  const dispatch = useAppDispatch();
  const gameApi = useGameApi();

  useEvent(
    gameApi.events,
    "scrollOpened",
    useCallback(
      ({ page }) => {
        dispatch(showScroll(page));
      },
      [dispatch],
    ),
  );
};
