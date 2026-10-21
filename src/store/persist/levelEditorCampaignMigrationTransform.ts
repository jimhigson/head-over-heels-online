import createTransform from "redux-persist/es/createTransform";

import { type EditorCampaign } from "../../editor/editorTypes";
import { migrateTeleporterActivationInPlace } from "../../model/inPlaceMutators/migrateTeleporterActivationInPlace";
import { valuesIter } from "../../utils/entries";

/**
 * brings the editor's locally kept campaigns up to the current json format as
 * they are restored, so a campaign worked on before a format change reads in
 * the new form. Runs on every restore, so the migrations it applies must be
 * idempotent
 */
export const levelEditorCampaignMigrationTransform = createTransform<
  EditorCampaign | undefined,
  EditorCampaign | undefined
>(
  (campaign) => campaign,
  (storedCampaign) => {
    // freshly parsed from storage, so ours to migrate in place:
    for (const room of valuesIter(storedCampaign?.rooms ?? {})) {
      migrateTeleporterActivationInPlace(room);
    }
    return storedCampaign;
  },
  { whitelist: ["campaignInProgress", "remoteCampaign"] },
);
