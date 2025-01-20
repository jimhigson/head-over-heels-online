import { useLayoutEffect } from "react";
import { setUpscale } from "../gameMenusSlice";
import { store } from "../store";
import { useAppDispatch } from "../hooks";
import { calculateUpscale } from "../../game/render/calculateUpscale";

export const useUpdateUpscaleWhenWindowResizes = (): void => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const updateSize = () => {
      const { emulatedResolution } = store.getState();

      const upscale = calculateUpscale(
        { x: window.innerWidth, y: window.innerHeight },
        emulatedResolution,
      );
      console.log(
        `changing upscale to ${JSON.stringify(upscale)}x for ${window.innerWidth}x${window.innerHeight} window`,
      );

      dispatch(setUpscale(upscale));
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [dispatch]);
};
