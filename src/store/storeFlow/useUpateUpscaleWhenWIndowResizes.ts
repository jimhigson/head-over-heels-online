import { useLayoutEffect } from "react";
import { setUpscale } from "../gameMenusSlice";
import { store } from "../store";
import { useAppDispatch } from "../hooks";
import { calculateUpscaleForCurrentDevice } from "../../game/render/calculateUpscale";
import { selectEmulatedResolutionName } from "../selectors";

const updateSize = () => {
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
    updateSize();
  }, []);

  useLayoutEffect(() => {
    // on every resize, update the store with the correct size:
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [dispatch]);
};
