import { useAppDispatch } from "../../store/hooks";
import { useEditorAppSelector } from "../../store/store";
import {
  saveDialogClosed,
  selectEditorSaveDialog,
} from "../slice/editorSaveSlice";
import {
  confirmOverwritePressed,
  latestVersionLoadedInsteadOfSaving,
  openCampaignSubmitted,
  saveAsSubmitted,
  savePressed,
} from "../slice/saveAndLoadThunks";
import { ConfirmSaveOverDialog } from "../toolbar/saving/ConfirmSaveOverDialog";
import { SaveFailedDialog } from "../toolbar/saving/SaveFailedDialog";
import { LoadingCampaignDialog } from "./LoadingCampaignDialog";
import { OpenCampaignDialog } from "./OpenCampaignDialog";
import { SaveAsDialog } from "./SaveAsDialog";

/**
 * the dialogs for the save/open journeys, driven by the editorSave slice's
 * dialog state - rendered once at the editor's top level, not by the buttons
 * that trigger them
 */
export const SaveAndLoadDialogs = () => {
  const dialog = useEditorAppSelector(selectEditorSaveDialog);
  const dispatch = useAppDispatch();

  return (
    <>
      <LoadingCampaignDialog />

      {dialog?.type === "saveAs" && (
        <SaveAsDialog
          onClose={() => dispatch(saveDialogClosed())}
          onDone={({ campaignName, publish }) =>
            dispatch(saveAsSubmitted({ campaignName, publish }))
          }
        />
      )}

      {dialog?.type === "confirmOverwrite" && (
        <ConfirmSaveOverDialog
          campaignName={dialog.campaignName}
          latest={dialog.latest}
          onConfirm={() => dispatch(confirmOverwritePressed())}
          onClose={() => dispatch(saveDialogClosed())}
        />
      )}

      {dialog?.type === "openCampaign" && (
        <OpenCampaignDialog
          onClose={() => dispatch(saveDialogClosed())}
          onDone={({ campaignLocator }) =>
            dispatch(openCampaignSubmitted(campaignLocator))
          }
        />
      )}

      {dialog?.type === "saveFailed" && (
        <SaveFailedDialog
          failure={dialog.failure}
          onForceSave={() => dispatch(savePressed({ force: true }))}
          onRetry={() => dispatch(savePressed())}
          onLoadLatest={() => dispatch(latestVersionLoadedInsteadOfSaving())}
          onClose={() => dispatch(saveDialogClosed())}
        />
      )}
    </>
  );
};
