import { useRef, useState } from "preact/hooks";

import { type JsonItemType } from "../../../model/json/JsonItem";
import { type CampaignVerificationIssue } from "../../../model/json/verification/CampaignVerification";
import {
  type VerificationCampaign,
  type VerificationRoomJson,
} from "../../../model/json/verification/verificationTypes";
import { roomJsonItemsIterable } from "../../../model/RoomJson";
import { editorStore, store, useEditorAppSelector } from "../../../store/store";
import { Border } from "../../../ui/Border";
import { Button } from "../../../ui/Button";
import { Dialog } from "../../../ui/Dialog";
import { DialogHeader } from "../../../ui/DialogHeader";
import { DialogPortal } from "../../../ui/DialogPortal";
import { useKeyboardShortcut } from "../../../ui/useKeyboardShortcut";
import { entries } from "../../../utils/entries";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../../editorTypes";
import { RoomPreview } from "../../roomPreview/RoomPreview";
import {
  campaignJsonAutoFixed,
  changeToRoom,
  selectCurrentCampaignInProgress,
  setSelectedItemsInRoom,
} from "../../slice/levelEditorSlice";
import { useVerifyCampaign } from "../../verify/useVerifyCampaign";
import { confirmDeleteRoomThunk } from "../confirmThunk";
import { ToolbarButton } from "./ToolbarButton";

/** heading for issues that aren't tied to one room (eg a missing player start) */
const wholeCampaignHeading = "";

/** item types that are just room structure, not gameplay content */
const structuralItemTypes = new Set<JsonItemType>(["wall", "floor", "door"]);

/**
 * a room with nothing but walls, floors and doors carries no gameplay content,
 * so it is most likely a shell left over by mistake and safe to offer to delete
 */
const isEmptyLeftoverRoom = (room: VerificationRoomJson): boolean =>
  roomJsonItemsIterable(room).every((item) =>
    structuralItemTypes.has(item.type),
  );

const verifyTooltipMarkdown = `
## Problems

Your campaign has problems that may stop it working

Click to see the list
`;

export type VerifyIssuesDialogProps = {
  issues: CampaignVerificationIssue<unknown>[];
  onClose: () => void;
};

const VerifyIssuesDialog = ({ issues, onClose }: VerifyIssuesDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useKeyboardShortcut(
    ["Escape", "Enter", "NumpadEnter"],
    false,
    onClose,
    dialogRef.current,
  );

  // the verifiers run on plain-string ids; cast across the brand boundary here
  const openCampaign = (): VerificationCampaign =>
    selectCurrentCampaignInProgress(
      editorStore.getState(),
    ) as VerificationCampaign;
  const loadFixedCampaign = (campaign: VerificationCampaign) =>
    store.dispatch(
      campaignJsonAutoFixed({ campaign: campaign as EditorCampaign }),
    );

  const applyFix = (issue: CampaignVerificationIssue<unknown>) => {
    loadFixedCampaign(issue.verifier.fix(openCampaign(), issue.issueData));
  };

  const fixAll = () => {
    const fixed = issues.reduce(
      (campaign, issue) =>
        issue.fixable ?
          issue.verifier.fix(campaign, issue.issueData)
        : campaign,
      openCampaign(),
    );
    loadFixedCampaign(fixed);
  };

  const goToRoom = (roomId: string, itemId: string | undefined) => {
    store.dispatch(changeToRoom(roomId as EditorRoomId));
    if (itemId !== undefined) {
      // select the item to update - safe because it lives in the room we just
      // navigated to
      store.dispatch(
        setSelectedItemsInRoom({ jsonItemIds: [itemId as EditorRoomItemId] }),
      );
    }
    onClose();
  };

  // confirm then delete a specific room - reuses the toolbar's delete-room flow
  const deleteRoom = (roomId: string) =>
    store.dispatch(confirmDeleteRoomThunk(roomId as EditorRoomId));

  // the open campaign, used to spot empty leftover rooms; reactive so the list
  // updates as rooms are fixed or deleted
  const campaign = useEditorAppSelector(
    selectCurrentCampaignInProgress,
  ) as VerificationCampaign;

  const fixableIssueCount = issues.filter((issue) => issue.fixable).length;

  const issuesByRoom = Object.groupBy(
    issues,
    (issue) => issue.roomId ?? wholeCampaignHeading,
  );

  return (
    <DialogPortal>
      <Border
        className="scale-editor bg-checkerboard-stifled-alphas"
        onClick={onClose}
      />
      {/* stop window-level shortcuts catching our keypresses that match their shortcuts */}
      <div className="contents no-keyboard-shortcuts">
        <Dialog ref={dialogRef} wide tall className="scale-editor p-1">
          <DialogHeader>{issues.length} Issues</DialogHeader>
          <div className="flex flex-col pt-1 flex-grow text-multi-line overflow-y-auto scrollbar scrollbar-w1 scrollbar-thumb-lightGrey pr-1 gap-2">
            {entries(issuesByRoom)
              .sort(([a], [b]) =>
                a === wholeCampaignHeading ? -1
                : b === wholeCampaignHeading ? 1
                : 0,
              )
              .map(([roomHeading, roomIssues]) => {
                const roomId = roomIssues?.[0]?.roomId;
                const room =
                  roomId !== undefined ? campaign.rooms[roomId] : undefined;
                const emptyLeftover =
                  room !== undefined && isEmptyLeftoverRoom(room);
                return (
                  <div key={roomHeading} className="flex flex-col gap-1">
                    {roomHeading && (
                      <span className="text-metallicBlue text-double-height">
                        {roomHeading}
                      </span>
                    )}
                    {roomId !== undefined && (
                      <RoomPreview roomId={roomId as EditorRoomId} />
                    )}
                    {emptyLeftover && roomId !== undefined && (
                      <div className="flex flex-col gap-half">
                        <div className="text-midGrey">
                          This room has only walls, floors and doors — it may be
                          an empty room left over by mistake.
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={() => deleteRoom(roomId)}
                            className="bg-midRed px-1 py-half text-white h-3"
                          >
                            Delete room
                          </Button>
                        </div>
                      </div>
                    )}
                    {roomIssues?.map((issue, i) => {
                      const { roomId, itemId } = issue;
                      return (
                        <div key={i} className="flex flex-col gap-half">
                          <div
                            className={
                              issue.severity === "error" ?
                                "text-midRed"
                              : "text-shadow"
                            }
                          >
                            {issue.verifier.name}
                          </div>
                          <div className="text-midGrey">{issue.msg}</div>
                          <div className="flex gap-1">
                            <div className="text-lightGrey">
                              {issue.fixText}
                            </div>
                            <div className="flex-grow" />
                            {issue.fixable && (
                              <Button
                                onClick={() => applyFix(issue)}
                                className="bg-moss px-1 py-half text-white h-3"
                              >
                                Fix
                              </Button>
                            )}
                            {roomId !== undefined && (
                              <Button
                                className="bg-pastelBlue px-1 py-half text-white shrink-0 hover:bg-highlightBeige  h-3"
                                onClick={() => goToRoom(roomId, itemId)}
                              >
                                Go to
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end mt-1 text-single-line gap-1">
            {fixableIssueCount > 0 && (
              <Button
                onClick={fixAll}
                className="px-1 py-half self-stretch bg-moss h-3 text-white"
              >
                {`Fix ${fixableIssueCount} auto-fixable issues`}
              </Button>
            )}
            <Button
              onClick={onClose}
              className="px-1 py-half self-stretch bg-midRed h-3 text-white"
            >
              x Exit
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};

export const VerifyCampaignButton = () => {
  const verification = useVerifyCampaign();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (verification.length === 0) {
    // campaign is valid - nothing to warn about
    return null;
  }

  const errorCount = verification.filter(
    (issue) => issue.severity === "error",
  ).length;
  const warningCount = verification.filter(
    (issue) => issue.severity === "warning",
  ).length;
  const summary = [
    { count: errorCount, noun: "errors" },
    { count: warningCount, noun: "warnings" },
  ]
    .filter(({ count }) => count > 0)
    .map(({ count, noun }) => `${count} ${noun}`)
    .join(", ");

  return (
    <>
      <ToolbarButton
        ariaLabel="Verify and fix campaign"
        className={`${errorCount > 0 ? "bg-midRed" : "bg-shadow"} w-full h-2`}
        onClick={() => setDialogOpen(true)}
        tooltipContent={verifyTooltipMarkdown}
      >
        <span className="relative text-single-line">{summary}</span>
      </ToolbarButton>

      {dialogOpen && (
        <VerifyIssuesDialog
          issues={verification}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
};
