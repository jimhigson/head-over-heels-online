import { defaultUserSettings } from "../../store/slices/userSettings/defaultUserSettings";
import { type DisplaySettings } from "../../store/slices/userSettings/userSettingsSlice";

export const resolveCrtFilterEnabled = ({
  crtFilter,
}: DisplaySettings): boolean =>
  crtFilter ?? defaultUserSettings.displaySettings.crtFilter;
