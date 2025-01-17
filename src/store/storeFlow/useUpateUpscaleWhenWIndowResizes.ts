import { useLayoutEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { calculateUpscale } from "@/game/render/upscale";
import { setUpscale } from "../gameMenusSlice";
import { store } from "../store";

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
        `changing upscale to ${upscale.scaleFactor}x for ${window.innerWidth}x${window.innerHeight} window`,
      );

      dispatch(setUpscale(upscale));
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [dispatch]);
};
