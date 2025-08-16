import { useState, useRef, useEffect } from "react";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { Border } from "../../ui/Border";
import { Button } from "../../ui/button";
import { Dialog } from "../../ui/dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import { store } from "../../store/store";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";
import { multilineTextClass } from "../../game/components/dialogs/menuDialog/multilineTextClass";
import { Switch } from "../../ui/Switch";
import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { cn } from "../../ui/cn";

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
      (store.getState() as RootStateWithLevelEditorSlice).levelEditor
        .campaignInProgress.locator.campaignName ?? "",
  );
  const [publish, setPublish] = useState(false);

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
      <Border className="scale-editor bg-checkerboard-stifled-alphas" />
      {/* stop window-level shortcuts catching our keypresses that match their shortcuts */}
      <div className="contents no-keyboard-shortcuts">
        <Dialog ref={dialogRef} wide className="scale-editor p-1 !h-min">
          <BitmapText className="text-white sprites-double-height bg-midRed text-center py-half">
            Save as...
          </BitmapText>
          <BitmapText className={`${multilineTextClass} text-lightGrey pt-1`}>
            This is the name the community will see your campaign listed as - if
            you choose to publish it
          </BitmapText>
          <input
            ref={inputRef}
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="font-head-over-heels bg-metallicBlueHalfbrite text-white placeholder-lightGrey border border-white px-1 py-1 caret-midRed caretsh"
            placeholder="Enter a Campaign name"
          />
          <div className="pt-1">
            <BlockyMarkdown
              className="text-lightGrey"
              markdown={`If you *publish*, your campaign will be listed under ‘community contributed’ on blockstack.ing              
**unlisted** campaigns can still be shared privately using the share button`}
            ></BlockyMarkdown>
          </div>

          <div className="flex gap-1 justify-end text-white items-center mt-1">
            <Switch
              className="w-min"
              label="Publish"
              falseLabel="unlisted"
              trueLabel="publish"
              value={publish}
              onChange={setPublish}
            />
            <div className="flex-grow" />
            <Button onClick={onClose} className="px-1 py-half self-stretch">
              <BitmapText>Cancel</BitmapText>
            </Button>
            <Button
              disabled={disabled}
              onClick={() => onDone({ campaignName, publish })}
              className="bg-midRed px-1 py-half gap-1"
            >
              <BitmapText>Save</BitmapText>
              <span
                className={cn(`sprite texture-editor_tool_save relative`, {
                  "sprite-revert-to-two-tone-dim": disabled,
                })}
              />
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
