import { type EditorThunk } from "../../../store/store";
import { showDialog } from "../../toolbar/showDialog";

/**
 * show which build of the editor this is, resolving once closed
 */
export const showAboutDialogThunk =
  (): EditorThunk<Promise<void>> => async () => {
    // imported when first opened, since it is rarely looked at:
    const { AboutDialog } = await import("./AboutDialog");
    await showDialog<void>((settle) => (
      <AboutDialog onClose={() => settle()} />
    ));
  };
