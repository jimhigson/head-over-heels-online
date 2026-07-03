import { useState } from "preact/hooks";

import { type SaveFailure } from "../../../db/campaign";
import { type TextureTailwindClass } from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppDispatch } from "../../../store/hooks";
import { editorStore, useEditorAppSelector } from "../../../store/store";
import { cn } from "../../../ui/cn";
import { emptyArray } from "../../../utils/empty";
import { OpenCampaignDialog } from "../../editorDialogs/OpenCampaignDialog";
import { SaveAsDialog } from "../../editorDialogs/SaveAsDialog";
import { campaignIsNamed } from "../../editorTypes";
import {
  selectCurrentCampaignInProgress,
  selectCurrentCampaignVersion,
  setCampaignName,
  setCampaignPublished,
} from "../../slice/levelEditorSlice";
import {
  loadCampaignIntoEditor,
  saveCampaign,
} from "../../slice/saveAndLoadThunks";
import { MenuButton, MenuItemButton } from "../buttons/MenuButton";
import { ToolbarButton } from "../buttons/ToolbarButton";
import { useShortTimeDisplay } from "../useShortTimeDisplay";
import { useSupabaseUser } from "../useSupabaseUser";
import { SaveFailedDialog } from "./SaveFailedDialog";
import { useRemoteIsInSync } from "./useRemoteIsInSync";

export const showOkAfterSaveDuration = 2000;

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
  const { doneNow, justDone } = useShortTimeDisplay();
  const [saveAsDialogOpen, setSaveAsDialogOpen] = useState(false);
  const [openDialogOpen, setOpenDialogOpen] = useState(false);
  const haveNamedCampaign: boolean = useEditorAppSelector((state) =>
    campaignIsNamed(selectCurrentCampaignInProgress(state)),
  );
  const savedVersion = useEditorAppSelector(selectCurrentCampaignVersion);
  const dispatch = useAppDispatch();
  const [saveFailure, setSaveFailure] = useState<null | SaveFailure>(null);

  // save, surfacing any failure as the SaveFailedDialog; `force` overrides a
  // stale-version conflict
  const trySave = async (force: boolean) => {
    const result = await dispatch(saveCampaign({ force }));
    if (result.ok) {
      setSaveFailure(null);
      doneNow();
    } else {
      setSaveFailure(result.failure);
    }
  };

  return (
    <>
      {justDone > 0 ?
        <ToolbarButton
          ariaLabel={`Saved as version ${savedVersion}`}
          disabled
          className="!bg-moss !text-white"
        >
          <span className="relative leading-none text-single-line">
            {`v${savedVersion}`}
          </span>
        </ToolbarButton>
      : <MenuButton
          main={
            <ToolbarButton
              ariaLabel="Save campaign"
              disabled={user === null || savedIsInSync}
              onClick={async () => {
                const state = editorStore.getState();
                const campaign = selectCurrentCampaignInProgress(state);

                if (!campaignIsNamed(campaign)) {
                  setSaveAsDialogOpen(true);
                } else {
                  await trySave(false);
                }
              }}
              shortcutKeys={["^S", "⌘S"]}
              tooltipContent={saveTooltipMarkdown}
            >
              <div className="flex flex-row items-center">
                <span
                  className={cn(
                    `sprite sprite-tinted text-highlightBeige ${"texture-hud_char_➡" satisfies TextureTailwindClass} relative`,
                    { "text-lightGrey": user === null },
                  )}
                />
                <span
                  className={cn(
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
                onClick={() => setSaveAsDialogOpen(true)}
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
            onClick={() => setOpenDialogOpen(true)}
            tooltipContent={loadTooltipMarkdown}
            shortcutKeys={["^O", "⌘O"]}
          >
            <div className="flex flex-row items-center">
              <span
                className={cn(
                  `sprite ${"texture-editor_tool_open" satisfies TextureTailwindClass} relative`,
                )}
              />
              <span
                className={cn(
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
              onClick={() => {
                const state = editorStore.getState();
                const campaign = selectCurrentCampaignInProgress(state);

                if (!campaignIsNamed(campaign)) {
                  throw new Error(
                    "can only revert if already on a named campaign",
                  );
                }
                const { locator } = campaign;
                dispatch(loadCampaignIntoEditor(locator));
              }}
            >
              Revert
            </MenuItemButton>,
          ]
        : emptyArray}
      </MenuButton>

      {saveAsDialogOpen && (
        <SaveAsDialog
          onClose={() => {
            setSaveAsDialogOpen(false);
          }}
          onDone={({ campaignName, publish }) => {
            dispatch(setCampaignName(campaignName));
            dispatch(setCampaignPublished(publish));
            trySave(false);
            setSaveAsDialogOpen(false);
          }}
        />
      )}

      {openDialogOpen && (
        <OpenCampaignDialog
          onClose={() => {
            setOpenDialogOpen(false);
          }}
          onDone={({ campaignLocator }) => {
            dispatch(loadCampaignIntoEditor(campaignLocator));
            setOpenDialogOpen(false);
          }}
        />
      )}

      {saveFailure && (
        <SaveFailedDialog
          failure={saveFailure}
          onForceSave={() => trySave(true)}
          onRetry={() => trySave(false)}
          onLoadLatest={() => {
            const campaign = selectCurrentCampaignInProgress(
              editorStore.getState(),
            );
            if (campaignIsNamed(campaign)) {
              dispatch(
                loadCampaignIntoEditor({ ...campaign.locator, version: -1 }),
              );
            }
            setSaveFailure(null);
          }}
          onClose={() => setSaveFailure(null)}
        />
      )}
    </>
  );
};
