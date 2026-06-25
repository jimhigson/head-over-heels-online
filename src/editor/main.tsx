import { render } from "preact";

import "./index.css";
import "./JsonRoomEditor/codiconFontOverrides.css";
import "./JsonRoomEditor/monacoTooltip.css";

import { Provider } from "react-redux";

import { store } from "../store/store";
import { LevelEditorLoader } from "./LevelEditorLoader";
import { registerRoomPreviewSnapshotListeners } from "./roomPreview/roomPreviewListeners";

registerRoomPreviewSnapshotListeners();

render(
  <Provider store={store}>
    <LevelEditorLoader />
  </Provider>,
  document.getElementById("root")!,
);
