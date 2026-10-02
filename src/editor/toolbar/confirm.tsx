import { ConfirmDialog, type ConfirmDialogProps } from "./ConfirmDialog";
import { showDialog } from "./showDialog";

export type ConfirmOptions = Omit<ConfirmDialogProps, "onCancel" | "onOk">;

/** ask the user to confirm, resolving true for ok and false for cancel */
export const confirm = (options: ConfirmOptions): Promise<boolean> =>
  showDialog<boolean>((settle) => (
    <ConfirmDialog
      {...options}
      onCancel={() => settle(false)}
      onOk={() => settle(true)}
    />
  ));
