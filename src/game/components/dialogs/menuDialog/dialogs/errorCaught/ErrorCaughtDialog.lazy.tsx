import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";
import { type SerialisableError } from "../../../../../../utils/redux/createSerialisableErrors";

/**
 * shown only if the error dialog's chunk itself cannot be fetched (crashed on
 * a first visit before the service worker cached it, and the network is gone) -
 * deliberately zero-dependency markup so it can always render
 */
const ErrorCaughtFallback = ({
  errors,
}: {
  errors: Array<SerialisableError>;
}) => (
  <dialog open class="bg-highlightBeige p-2">
    <p>something went wrong - try refreshing the page</p>
    <p class="text-single-line">{errors[0]?.message}</p>
  </dialog>
);

export const LazyErrorCaughtDialog = LazyDialogHoc(
  lazy(
    importOnce(() =>
      import("./ErrorCaughtDialog").catch(() => ({
        default: ErrorCaughtFallback,
      })),
    ),
  ),
);
