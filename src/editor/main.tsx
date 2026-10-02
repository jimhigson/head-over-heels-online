import { TextureStyle } from "pixi.js";

import "./index.css";
import "./JsonRoomEditor/codiconFontOverrides.css";
import "./JsonRoomEditor/monacoTooltip.css";

import { render } from "preact";
import { Provider } from "react-redux";

import { installAppTickerAsPixiShared } from "../game/mainLoop/installAppTickerAsPixiShared";
import { installE2eAdvanceTimeHandle } from "../game/mainLoop/installE2eAdvanceTimeHandle";
import { store } from "../store/store";
import { LevelEditorLoader } from "./LevelEditorLoader";
import { registerRoomPreviewSnapshotListeners } from "./roomPreview/roomPreviewListeners";
import { registerEditorWebMcpTools } from "./webMcp/registerEditorWebMcpTools";

if (import.meta.env.MODE === "visual-regression") {
  // during e2e tests, nothing ticks unles the test progresses time,
  // this needs to be done before anything renders:
  installE2eAdvanceTimeHandle();
}

// before any pixi renderer is created, since pixi reads Ticker.system on init:
installAppTickerAsPixiShared();
// before any pixi texture is created, including room previews' filter textures:
TextureStyle.defaultOptions.scaleMode = "nearest";

registerRoomPreviewSnapshotListeners();
registerEditorWebMcpTools();

render(
  <Provider store={store}>
    <LevelEditorLoader />
  </Provider>,
  document.getElementById("root")!,
);
