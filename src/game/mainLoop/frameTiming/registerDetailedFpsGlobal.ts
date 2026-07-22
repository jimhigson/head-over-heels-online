/* eslint-disable no-console */
import { toggleUserSetting } from "../../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../../store/store";
import { importOnce } from "../../../utils/importOnce";

declare global {
  interface Window {
    detailedFps: (reportIntervalMs?: number) => void;
  }
}

// importOnce so repeated detailedFps() calls don't re-import the module
// (safari misbehaves on repeated dynamic imports of the same module):
const importEnableDetailedFrameTimingLog = importOnce(
  () => import("./enableDetailedFrameTimingLog"),
);

/**
 * puts `detailedFps()` on the window as a console entry point. Only this stub
 * ships in the main game bundle: calling it dynamically imports the
 * frame-timing chunk and enables the detailed console log there
 */
export const registerDetailedFpsGlobal = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.detailedFps = (reportIntervalMs?: number) => {
    // the main loop only feeds the timing stats while the fps display is on,
    // so turn it on - without it the log would silently never fire:
    store.dispatch(toggleUserSetting({ path: "showFps", value: true }));
    importEnableDetailedFrameTimingLog().then(
      ({ enableDetailedFrameTimingLog }) =>
        enableDetailedFrameTimingLog(reportIntervalMs),
    );
  };

  console.log(
    "%cPerformance timing available:",
    "color: #4CAF50; font-weight: bold",
  );
  console.log(
    "call detailedFps() to log detailed frame timing stats to the console (also turns on the FPS display). Pass an interval in ms, eg detailedFps(50), to report more often.",
  );
};
