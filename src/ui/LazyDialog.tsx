import { type ComponentChildren } from "preact";
import { type FC, Suspense } from "preact/compat";

import { AssetLoading } from "../store/slices/assetsLoading/AssetLoading";
import { backToParentMenu } from "../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../store/useDispatchActionCallback";
import { Border } from "./Border";
import { Dialog } from "./Dialog";
import { DialogPortal } from "./DialogPortal";
import { SpinnerHead } from "./Spinner";

export type LazyDialogProps = {
  children: ComponentChildren;
  /** the colour classes of the dialog being loaded, so the spinner shows in its colours */
  class: string;
};

const LazyDialog = ({ children, class: className }: LazyDialogProps) => (
  <Suspense
    fallback={
      <DialogPortal>
        <AssetLoading />
        <Border onClick={useDispatchActionCallback(backToParentMenu)} />
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
  <P extends object>(LazyComponent: FC<P>, lazyDialogClass: string) =>
  (p: P) => {
    return (
      <LazyDialog class={lazyDialogClass}>
        <LazyComponent {...p} />
      </LazyDialog>
    );
  };
