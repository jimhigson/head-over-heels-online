import { ConfirmDialog, type ConfirmDialogProps } from "./ConfirmDialog";
import { showDialog } from "./showDialog";

export type AlertOptions = Pick<
  ConfirmDialogProps,
  "body" | "heading" | "okText"
>;

/** tell the user something, resolving once they dismiss it */
export const showAlert = (options: AlertOptions): Promise<void> =>
  showDialog<void>((settle) => (
    <ConfirmDialog
      {...options}
      onCancel={() => settle()}
      onOk={() => settle()}
    />
  ));
