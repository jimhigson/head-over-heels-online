import type { FC, ReactNode } from "react";

import { Suspense } from "react";

import { GameAssetLoading } from "../store/slices/gameAssetsLoading/GameAssetLoading";
import { backToParentMenu } from "../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../store/useDispatchActionCallback";
import { Border } from "./Border";
import { Dialog } from "./dialog";
import { DialogPortal } from "./DialogPortal";
import { SpinnerHead } from "./Spinner";

export const LazyDialog = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <DialogPortal>
        <GameAssetLoading />
        <Border onClick={useDispatchActionCallback(backToParentMenu)} />
        <Dialog className="bg-highlightBeige zx:bg-zxWhite">
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
