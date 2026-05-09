import { render } from "preact";

import "./index.css";

import { Provider } from "react-redux";

import { store } from "../store/store";
import { LevelEditorLoader } from "./LevelEditorLoader";

render(
  <Provider store={store}>
    <LevelEditorLoader />
  </Provider>,
  document.getElementById("root")!,
);
