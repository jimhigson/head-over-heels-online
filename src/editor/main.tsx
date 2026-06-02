import { render } from "preact";

import "./index.css";

import { Provider } from "react-redux";

import { loadHeadOverHeelsFont } from "../sprites/loadHeadOverHeelsFont";
import { store } from "../store/store";
import { LevelEditorLoader } from "./LevelEditorLoader";
import { registerRoomPreviewListeners } from "./roomPreview/roomPreviewListeners";

registerRoomPreviewListeners();

loadHeadOverHeelsFont();

render(
  <Provider store={store}>
    <LevelEditorLoader />
  </Provider>,
  document.getElementById("root")!,
);
