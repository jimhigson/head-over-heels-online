import { useEffect } from "react";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

export const useAddApplicationCanvasToDom = (
  renderArea: HTMLDivElement | null,
) => {
  const application = useProvidedPixiApplication();
  useEffect(() => {
    if (renderArea) {
      renderArea.appendChild(application.canvas);
      return () => {
        renderArea.removeChild(application.canvas);
      };
    }
  }, [renderArea, application]);
};
