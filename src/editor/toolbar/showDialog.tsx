import { render, type VNode } from "preact";
import { Provider } from "react-redux";

import { store } from "../../store/store";

/**
 * show a dialog from anywhere, outside the component tree (eg from a click
 * handler or a thunk), resolving with whatever value the dialog settles on.
 * The dialog is given `settle`, which closes it and resolves the promise
 */
export const showDialog = <T,>(
  /** renders the dialog, which calls `settle` once to close with its result */
  renderDialog: (settle: (result: T) => void) => VNode,
): Promise<T> =>
  new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const settle = (result: T) => {
      render(null, container);
      container.remove();
      resolve(result);
    };

    render(
      <Provider store={store}>{renderDialog(settle)}</Provider>,
      container,
    );
  });
