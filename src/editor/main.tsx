import { render } from "preact";

import "./index.css";
import "./JsonRoomEditor/codiconFontOverrides.css";
import "./JsonRoomEditor/monacoTooltip.css";

import { Provider } from "react-redux";

import { installE2eAdvanceTimeHandle } from "../game/mainLoop/installE2eAdvanceTimeHandle";
import { store } from "../store/store";
import { LevelEditorLoader } from "./LevelEditorLoader";
import { registerRoomPreviewSnapshotListeners } from "./roomPreview/roomPreviewListeners";

if (import.meta.env.MODE === "visual-regression") {
  // before anything renders: in these builds nothing ticks unless a test says
  // so, and the editor draws on the same clock as the game
  installE2eAdvanceTimeHandle();
}

registerRoomPreviewSnapshotListeners();

render(
  <Provider store={store}>
    <LevelEditorLoader />
  </Provider>,
  document.getElementById("root")!,
);
