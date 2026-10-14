import { useEditorAppSelector } from "../../../store/store";
import { emptyArray } from "../../../utils/empty";
import { actionCommandDefinitions } from "../../commands/actionCommandDefinitions";
import { CommandMenuItem } from "../../commands/CommandMenuItem";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import { campaignIsNamed } from "../../editorTypes";
import { selectJustSaved } from "../../slice/editorSaveSlice";
import {
  selectCurrentCampaignInProgress,
  selectCurrentCampaignVersion,
} from "../../slice/levelEditorSlice";
import { MenuButton } from "../buttons/MenuButton";
import { MenuButtonMenu } from "../buttons/MenuButtonMenu";
import { ToolbarButton } from "../buttons/ToolbarButton";
import { useSupabaseUser } from "../useSupabaseUser";
import { useCampaignHasUnsavedChanges } from "./useCampaignHasUnsavedChanges";

export const SaveAndLoadButtons = () => {
  const user = useSupabaseUser();
  const campaignHasUnsavedChanges = useCampaignHasUnsavedChanges();
  const justSaved = useEditorAppSelector(selectJustSaved);
  const haveNamedCampaign: boolean = useEditorAppSelector((state) =>
    campaignIsNamed(selectCurrentCampaignInProgress(state)),
  );
  const savedVersion = useEditorAppSelector(selectCurrentCampaignVersion);

  return (
    <>
      {justSaved ?
        <ToolbarButton
          ariaLabel={`Saved as version ${savedVersion}`}
          disabled
          class="!bg-moss !text-white"
        >
          <span class="relative leading-none text-single-line">
            {`v${savedVersion}`}
          </span>
        </ToolbarButton>
      : <MenuButton
          main={
            <CommandToolbarButton
              command={actionCommandDefinitions.saveCampaign}
            />
          }
        >
          {user ?
            [
              <MenuButtonMenu key="saveAs">
                <CommandMenuItem
                  command={actionCommandDefinitions.saveCampaignAs}
                />
              </MenuButtonMenu>,
            ]
          : emptyArray}
        </MenuButton>
      }

      <MenuButton
        main={
          <CommandToolbarButton
            command={actionCommandDefinitions.openCampaign}
          />
        }
      >
        {haveNamedCampaign && campaignHasUnsavedChanges ?
          [
            <MenuButtonMenu key="revert">
              <CommandMenuItem
                command={actionCommandDefinitions.revertCampaign}
              />
            </MenuButtonMenu>,
          ]
        : emptyArray}
      </MenuButton>
    </>
  );
};
