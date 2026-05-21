import { render } from "preact";
import { Provider } from "react-redux";

import { store } from "../../store/store";
import { ConfirmDialog, type ConfirmDialogProps } from "./ConfirmDialog";

export type ConfirmOptions = Omit<ConfirmDialogProps, "onCancel" | "onOk">;

export const confirm = (options: ConfirmOptions): Promise<boolean> =>
  new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const cleanup = () => {
      render(null, container);
      container.remove();
    };

    render(
      <Provider store={store}>
        <ConfirmDialog
          {...options}
          onCancel={() => {
            cleanup();
            resolve(false);
          }}
          onOk={() => {
            cleanup();
            resolve(true);
          }}
        />
      </Provider>,
      container,
    );
  });
