import { useLayoutEffect } from "react";
import { setUpscale } from "../slices/gameMenusSlice";
import { store } from "../store";
import { useAppDispatch } from "../hooks";
import { calculateUpscaleForCurrentDevice } from "../../game/render/calculateUpscale";
import { selectEmulatedResolutionName } from "../selectors";

export const updateUpscaleNow = () => {
  store.dispatch(
    setUpscale(
      calculateUpscaleForCurrentDevice(
        selectEmulatedResolutionName(store.getState()),
      ),
    ),
  );
};

export const useUpdateUpscaleWhenWindowResizes = (): void => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    // on first load, put the correct size in the store:
    updateUpscaleNow();
  }, []);

  useLayoutEffect(() => {
    // on every resize, update the store with the correct size:
    window.addEventListener("resize", updateUpscaleNow);
    return () => window.removeEventListener("resize", updateUpscaleNow);
  }, [dispatch]);
};
