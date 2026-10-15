import { useEditorAppSelector } from "../../../store/store";
import { selectCampaignHasUnsavedChanges } from "../../slice/levelEditorSlice";

export const useCampaignHasUnsavedChanges = () =>
  useEditorAppSelector(selectCampaignHasUnsavedChanges);
