import { useAppSelector } from "../../hooks";
import { selectTotalUpscale } from "./upscaleSlice";

export const useTotalUpscale = () => useAppSelector(selectTotalUpscale);
