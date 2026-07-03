import { type ComponentChildren } from "preact";
import { type FC, Suspense } from "preact/compat";

import { AssetLoading } from "../store/slices/assetsLoading/AssetLoading";
import { backToParentMenu } from "../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../store/useDispatchActionCallback";
import { Border } from "./Border";
import { Dialog } from "./Dialog";
import { DialogPortal } from "./DialogPortal";
import { SpinnerHead } from "./Spinner";

const LazyDialog = ({ children }: { children: ComponentChildren }) => (
  <Suspense
    fallback={
      <DialogPortal>
        <AssetLoading />
        <Border onClick={useDispatchActionCallback(backToParentMenu)} />
        <Dialog class="bg-highlightBeige zx:bg-zxWhite toppy:bg-toppyCool1">
          <SpinnerHead />
        </Dialog>
      </DialogPortal>
    }
  >
    {children}
  </Suspense>
);

export const LazyDialogHoc =
  <P extends object>(LazyComponent: FC<P>) =>
  (p: P) => {
    return (
      <LazyDialog>
        <LazyComponent {...p} />
      </LazyDialog>
    );
  };
