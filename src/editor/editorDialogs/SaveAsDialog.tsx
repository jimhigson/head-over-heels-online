import { useEffect, useRef, useState } from "preact/hooks";

import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useGetAllUsersLatestCampaignsQuery } from "../../store/slices/campaigns/editorCampaignsApiSlice";
import { editorStore, useEditorAppSelector } from "../../store/store";
import { Border } from "../../ui/Border";
import { Button } from "../../ui/Button";
import { cn } from "../../ui/cn";
import { Dialog } from "../../ui/Dialog";
import { DialogHeader } from "../../ui/DialogHeader";
import { DialogPortal } from "../../ui/DialogPortal";
import { Switch } from "../../ui/Switch";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";
import { valuesIter } from "../../utils/entries";
import { useSupabaseUser } from "../toolbar/useSupabaseUser";

/**
 * the names of the campaigns the current user owns, freshly fetched -
 * empty while loading or if they have none
 */
const useOwnCampaignNames = (): Array<string> => {
  const { data: campaignDirectory, refetch } =
    useGetAllUsersLatestCampaignsQuery({ publishedOnly: false });

  // force refetch on mount so a just-saved campaign is listed
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (campaignDirectory === undefined) {
    return [];
  }
  const ownEntry = valuesIter(campaignDirectory).find(
    (userEntry) => userEntry.user.isCurrentUser,
  );
  return ownEntry === undefined ?
      []
    : valuesIter(ownEntry.campaigns)
        .map((campaign) => campaign.name)
        .toArray();
};

export const SaveAsDialog = ({
  /**
   * Callback to close the dialog
   */
  onClose,
  /**
   * Callback when save is clicked, receives the campaign name
   */
  onDone,
}: {
  onClose: () => void;
  onDone: (param: { campaignName: string; publish: boolean }) => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [campaignName, setCampaignName] = useState(
    () =>
      editorStore.getState().levelEditor.campaignInProgress.locator
        .campaignName ?? "",
  );
  const [publish, setPublish] = useState(false);
  const campaignLocator = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.locator,
  );
  const supabaseUser = useSupabaseUser();
  // a never-saved campaign (version 0) can't be a fork of anyone's, whatever
  // placeholder userId it started with
  const isSomeoneElses =
    supabaseUser &&
    campaignLocator.version > 0 &&
    supabaseUser.id !== campaignLocator.userId;

  const ownCampaignNames = useOwnCampaignNames();

  const disabled = !campaignName.trim();

  // Focus the input when the dialog opens
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  // Example keyboard shortcuts for the dialog
  useKeyboardShortcut(["Escape"], false, onClose, dialogRef.current);

  useKeyboardShortcut(
    ["Enter", "NumpadEnter"],
    disabled,
    () => onDone({ campaignName, publish }),
    dialogRef.current,
  );

  return (
    <DialogPortal>
      <Border class="scale-editor bg-checkerboard-stifled-alphas" />
      {/* stop window-level shortcuts catching our keypresses that match their shortcuts */}
      <div class="contents no-keyboard-shortcuts">
        <Dialog
          ref={dialogRef}
          wide
          ariaLabel="Save campaign as"
          class="scale-editor p-1 !h-min"
        >
          <DialogHeader>Save as...</DialogHeader>
          {isSomeoneElses && (
            <span class="text-multi-line text-midRed ">
              You are saving a fork of another user's campaign under your own
              account
            </span>
          )}
          <span class="text-multi-line text-lightGrey pt-1">
            The community will see your campaign listed under this name
          </span>
          {ownCampaignNames.length > 0 && (
            <div class="flex flex-wrap gap-half items-center pt-1 pb-1">
              {ownCampaignNames.map((name) => (
                <Button
                  key={name}
                  class={cn("px-1 py-half text-white gap-1", {
                    "bg-midRed": name === campaignName,
                  })}
                  onClick={() => {
                    setCampaignName(name);
                    inputRef.current?.focus();
                  }}
                  aria-label={`Use campaign name ${name}`}
                >
                  <span class="text-single-line text-lightGrey">➡</span>
                  <span class="text-single-line">{name}</span>
                </Button>
              ))}
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.currentTarget.value)}
            aria-label="Campaign name"
            class="bg-metallicBlueHalfbrite text-white placeholder-lightGrey border border-white px-1 py-1 caret-midRed caretsh"
            placeholder="Enter a Campaign name"
          />
          <div class="pt-1">
            <BlockyMarkdown
              class="text-lightGrey"
              markdown={`If you *publish*, your campaign will be listed under ‘community contributed’ on blockstack.ing              
**Unlisted** campaigns can still be shared privately using the share button`}
            ></BlockyMarkdown>
          </div>

          <div class="flex gap-1 justify-end text-white items-center mt-1">
            <Switch
              class="w-min"
              label="Publish"
              ariaLabel="Publish campaign"
              ariaDescription="Published campaigns are playable by anybody via the game's menus; non-published campaigns can be loaded into the editor by anybody but are not directly playable"
              falseLabel="unlisted"
              trueLabel="publish"
              value={publish}
              onChange={setPublish}
            />
            <div class="flex-grow" />
            <Button
              onClick={onClose}
              class="px-1 py-half self-stretch bg-midGrey"
            >
              <span class="text-single-line">Cancel</span>
            </Button>
            <Button
              disabled={disabled}
              onClick={() => onDone({ campaignName, publish })}
              aria-label="Save campaign"
              class="px-1 py-half gap-1"
            >
              <span class="text-single-line">Save</span>
              <span
                class={cn(
                  `sprite ${"texture-editor_tool_save" satisfies TextureTailwindClass} relative`,
                  {
                    "sprite-revert-to-two-tone-dim": disabled,
                  },
                )}
              />
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
