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
  // during e2e tests, nothing ticks unles the test progresses time,
  // this needs to be done before anything renders:
  installE2eAdvanceTimeHandle();
}

registerRoomPreviewSnapshotListeners();

render(
  <Provider store={store}>
    <LevelEditorLoader />
  </Provider>,
  document.getElementById("root")!,
);
