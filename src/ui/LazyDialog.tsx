import type { ComponentChildren } from "preact";
import { type FC, Suspense } from "preact/compat";

import type { DialogId } from "../game/components/dialogs/menuDialog/DialogId";
import { AssetLoading } from "../store/slices/assetsLoading/AssetLoading";
import { closeMenuThunk } from "../store/slices/gameMenus/closeMenuThunk";
import { useDispatchActionCallback } from "../store/useDispatchActionCallback";
import { Border } from "./Border";
import { Dialog } from "./Dialog";
import { DialogPortal } from "./DialogPortal";
import { SpinnerHead } from "./Spinner";

export type LazyDialogProps = {
  children: ComponentChildren;
  /** the colour classes of the dialog being loaded, so the spinner shows in its colours */
  class: string;
  /**
   * the dialog being loaded, which clicking the border closes
   */
  dialogId: DialogId;
};

const LazyDialog = ({
  children,
  class: className,
  dialogId,
}: LazyDialogProps) => (
  <Suspense
    fallback={
      <DialogPortal>
        <AssetLoading />
        <Border onClick={useDispatchActionCallback(closeMenuThunk, dialogId)} />
        <Dialog class={`items-center justify-center ${className}`}>
          <SpinnerHead />
        </Dialog>
      </DialogPortal>
    }
  >
    {children}
  </Suspense>
);

export const LazyDialogHoc =
  <P extends object>(
    LazyComponent: FC<P>,
    lazyDialogClass: string,
    /**
     * the id of the dialog being loaded, or how to get it from its props
     */
    dialogId: ((props: P) => DialogId) | DialogId,
  ) =>
  (p: P) => {
    return (
      <LazyDialog
        class={lazyDialogClass}
        dialogId={typeof dialogId === "function" ? dialogId(p) : dialogId}
      >
        <LazyComponent {...p} />
      </LazyDialog>
    );
  };

/**
 * for dialogs overlaid on the running game: renders null (nothing) while loading,
 * so the game shows through rather than a loading screen flashing over it
 */
export const LazyOverlayDialogHoc =
  <P extends object>(LazyComponent: FC<P>) =>
  (p: P) => {
    return (
      <Suspense fallback={null}>
        <LazyComponent {...p} />
      </Suspense>
    );
  };
