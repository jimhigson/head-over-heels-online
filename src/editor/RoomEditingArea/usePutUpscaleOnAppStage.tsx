import { useAppSelector } from "../../store/hooks";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

export const usePutUpscaleOnAppStage = () => {
  const application = useProvidedPixiApplication();
  const gameEngineUpscale = useAppSelector(
    (state) => state.upscale.upscale.gameEngineUpscale,
  );
  application.stage.scale = gameEngineUpscale;
};
