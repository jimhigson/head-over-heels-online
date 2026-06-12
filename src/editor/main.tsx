import { render } from "preact";

import "./index.css";

import { Provider } from "react-redux";

import { loadHeadOverHeelsFont } from "../sprites/loadHeadOverHeelsFont";
import { store } from "../store/store";
import { loadCodiconFont } from "./JsonRoomEditor/loadCodiconFont";
import { LevelEditorLoader } from "./LevelEditorLoader";
import { registerRoomPreviewSnapshotListeners } from "./roomPreview/roomPreviewListeners";

registerRoomPreviewSnapshotListeners();

loadHeadOverHeelsFont();
loadCodiconFont();

render(
  <Provider store={store}>
    <LevelEditorLoader />
  </Provider>,
  document.getElementById("root")!,
);
