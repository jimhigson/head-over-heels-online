import { type EditorThunk } from "../../store/store";
import { showDialog } from "./showDialog";

/** show the open campaign's verification issues, resolving once closed */
export const showVerifyIssuesThunk =
  (): EditorThunk<Promise<void>> => async () => {
    // imported when first opened: the dialog is only needed once there are issues
    const { VerifyIssuesDialog } = await import("./VerifyIssuesDialog");
    await showDialog<void>((settle) => (
      <VerifyIssuesDialog onClose={() => settle()} />
    ));
  };
