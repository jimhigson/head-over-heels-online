import { zxSpectrumResolution as originalSystemRes } from "@/originalGame";
import { useLayoutEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { calculateUpscale } from "@/game/render/upscale";
import { setUpscale } from "../gameMenusSlice";

export const useUpdateUpscaleWhenWindowResizes = (): void => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const updateSize = () => {
      const upscale = calculateUpscale(
        { x: window.innerWidth, y: window.innerHeight },
        originalSystemRes,
      );
      dispatch(setUpscale(upscale));
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [dispatch]);
};
