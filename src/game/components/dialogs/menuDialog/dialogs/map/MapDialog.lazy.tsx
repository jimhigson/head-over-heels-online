import { lazy, Suspense } from "react";

import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { LoadingBanner } from "../../../../../../ui/LoadingBanner";
import { importOnce } from "../../../../../../utils/importOnce";

const ImportedMapDialog = lazy(
  importOnce(() =>
    import("./MapDialog").then((m) => ({ default: m.MapDialog })),
  ),
);

export const LazyMapDialog = () => (
  <Suspense
    fallback={
      <DialogPortal>
        <Border className="bg-pureBlack zx:bg-zxBlack" />
        <Dialog
          fullScreen
          className="bg-pureBlack zx:bg-zxBlack"
          dialogId="map"
          // allow exiting in case of not loading after a long time,
          // or just not wanting to wait:
          onClick={useDispatchActionCallback(backToParentMenu)}
        >
          <LoadingBanner>LOADING MAP</LoadingBanner>
        </Dialog>
      </DialogPortal>
    }
  >
    <ImportedMapDialog />
  </Suspense>
);
