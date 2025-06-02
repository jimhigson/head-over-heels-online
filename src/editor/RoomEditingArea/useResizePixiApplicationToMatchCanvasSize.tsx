import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectCanvasSize } from "../../store/slices/upscale/upscaleSlice";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

export const useResizePixiApplicationToMatchCanvasSize = () => {
  const application = useProvidedPixiApplication();

  const canvasSize = useAppSelector(selectCanvasSize);

  useEffect(() => {
    application.renderer?.resize(canvasSize.x, canvasSize.y);
  }, [application.renderer, canvasSize]);
};
