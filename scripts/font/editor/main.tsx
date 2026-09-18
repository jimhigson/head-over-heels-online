import { render } from "preact";
import { Provider } from "react-redux";

import { store } from "../../../src/store/store";
import { FontEditor } from "./FontEditor";
import "./index.css";

const root = document.getElementById("root");
if (root === null) {
  throw new Error("no #root to render the font editor into");
}
// the ui components borrowed from src/ui read the store - the tooltip re-establishes
// the game's css variables inside the top layer, and that comes from the store
render(
  <Provider store={store}>
    <FontEditor />
  </Provider>,
  root,
);
