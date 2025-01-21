import { useLayoutEffect } from "react";
import { setUpscale } from "../gameMenusSlice";
import { store } from "../store";
import { useAppDispatch } from "../hooks";
import { calculateUpscale } from "../../game/render/calculateUpscale";

const updateSize = () => {
  const {
    userSettings: { emulatedResolution },
  } = store.getState();

  const upscale = calculateUpscale(
    { x: window.innerWidth, y: window.innerHeight },
    emulatedResolution,
    window.devicePixelRatio,
  );
  console.log(
    `changing upscale to ${JSON.stringify(upscale)}x for ${window.innerWidth}x${window.innerHeight} window`,
  );

  store.dispatch(setUpscale(upscale));
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
