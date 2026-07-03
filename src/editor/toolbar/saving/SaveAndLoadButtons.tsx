import { type TextureTailwindClass } from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { cn } from "../../../ui/cn";
import { emptyArray } from "../../../utils/empty";
import { campaignIsNamed } from "../../editorTypes";
import {
  openCampaignDialogShown,
  saveAsDialogShown,
  selectJustSaved,
} from "../../slice/editorSaveSlice";
import {
  selectCurrentCampaignInProgress,
  selectCurrentCampaignVersion,
} from "../../slice/levelEditorSlice";
import { revertPressed, savePressed } from "../../slice/saveAndLoadThunks";
import { MenuButton, MenuItemButton } from "../buttons/MenuButton";
import { ToolbarButton } from "../buttons/ToolbarButton";
import { useSupabaseUser } from "../useSupabaseUser";
import { useRemoteIsInSync } from "./useRemoteIsInSync";

const saveTooltipMarkdown = `
## Save

Put your campaign on cassette tape, or even floppy disk! - to be shared or worked on later

(really, saves to a cloud database)
`;
const loadTooltipMarkdown = `
## Open

Load your saved campaign, or anyone else's for editing
`;

export const SaveAndLoadButtons = () => {
  const user = useSupabaseUser();
  const savedIsInSync = useRemoteIsInSync();
  const justSaved = useEditorAppSelector(selectJustSaved);
  const haveNamedCampaign: boolean = useEditorAppSelector((state) =>
    campaignIsNamed(selectCurrentCampaignInProgress(state)),
  );
  const savedVersion = useEditorAppSelector(selectCurrentCampaignVersion);
  const dispatch = useAppDispatch();

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
            <ToolbarButton
              ariaLabel="Save campaign"
              disabled={user === null || savedIsInSync}
              onClick={() => dispatch(savePressed())}
              shortcutKeys={["^S", "⌘S"]}
              tooltipContent={saveTooltipMarkdown}
            >
              <div class="flex flex-row items-center">
                <span
                  class={cn(
                    `sprite sprite-tinted text-highlightBeige ${"texture-hud_char_➡" satisfies TextureTailwindClass} relative`,
                    { "text-lightGrey": user === null },
                  )}
                />
                <span
                  class={cn(
                    `sprite ${"texture-editor_tool_save" satisfies TextureTailwindClass} relative`,
                    {
                      "sprite-revert-to-two-tone-dim": user === null,
                    },
                  )}
                />
              </div>
            </ToolbarButton>
          }
        >
          {user ?
            [
              <MenuItemButton
                key="save"
                onClick={() => dispatch(saveAsDialogShown())}
              >
                Save as...
              </MenuItemButton>,
            ]
          : emptyArray}
        </MenuButton>
      }

      <MenuButton
        main={
          <ToolbarButton
            ariaLabel="Open campaign"
            onClick={() => dispatch(openCampaignDialogShown())}
            tooltipContent={loadTooltipMarkdown}
            shortcutKeys={["^O", "⌘O"]}
          >
            <div class="flex flex-row items-center">
              <span
                class={cn(
                  `sprite ${"texture-editor_tool_open" satisfies TextureTailwindClass} relative`,
                )}
              />
              <span
                class={cn(
                  `sprite sprite-tinted text-highlightBeige ${"texture-hud_char_➡" satisfies TextureTailwindClass} relative`,
                )}
              />
            </div>
          </ToolbarButton>
        }
      >
        {haveNamedCampaign && !savedIsInSync ?
          [
            <MenuItemButton
              key="revert"
              onClick={() => dispatch(revertPressed())}
            >
              Revert
            </MenuItemButton>,
          ]
        : emptyArray}
      </MenuButton>
    </>
  );
};
