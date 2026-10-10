import nanoEqual from "nano-equal";

import { type SaveResult } from "../../db/campaign";
import { sequelCampaignLocator } from "../../gameInfo";
import { allVerifiers } from "../../model/json/verification/allVerifiers";
import { type CampaignVerificationIssue } from "../../model/json/verification/CampaignVerification";
import { verificationGraph } from "../../model/json/verification/helpers/verificationGraph";
import { type VerificationCampaign } from "../../model/json/verification/verificationTypes";
import { type CampaignLocator } from "../../model/modelTypes";
import { editorCampaignsApiSlice } from "../../store/slices/campaigns/editorCampaignsApiSlice";
import { editorStore } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import {
  directionsXyz4,
  type DirectionXyz4,
  type Xy,
} from "../../utils/vectors/vectors";
import { jsonResult } from "../../webMcp/jsonResult";
import { getModelContext } from "../../webMcp/modelContext";
import { reduxWebMcpTools } from "../../webMcp/reduxWebMcpTools";
import {
  campaignIsNamed,
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../editorTypes";
import { openPlaytest, playtestUrl } from "../playtestUrl";
import { dropItemsOnRoom } from "../slice/dropItemsOnRoom";
import { insertRoomInDirection } from "../slice/insertRoomInDirection";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomId,
  selectCursorSubRoomId,
} from "../slice/levelEditorSelectors";
import {
  addRoom,
  campaignJsonAutoFixed,
  roomJsonEdited,
  selectCurrentCampaignInProgress,
  selectEditorCameraAngle,
  selectItem,
  selectSelectedJsonItemIds,
  selectTool,
} from "../slice/levelEditorSlice";
import {
  loadCampaignIntoEditor,
  revertPressed,
  saveCampaign,
  saveCampaignAs,
  saveOutcomeShown,
} from "../slice/saveAndLoadThunks";
import { validateRoomJson } from "../validateRoomJson";
import { selectVerification } from "../verify/useVerifyCampaign";

const isXy = (value: unknown): value is Xy =>
  typeof value === "object" &&
  value !== null &&
  "x" in value &&
  typeof value.x === "number" &&
  "y" in value &&
  typeof value.y === "number";

const isDirectionXyz4 = (value: unknown): value is DirectionXyz4 =>
  directionsXyz4.some((direction) => direction === value);

const currentIssues = () => selectVerification(editorStore.getState());

/** the open campaign, as the verifiers see it (plain-string ids) */
const openCampaign = (): VerificationCampaign =>
  selectCurrentCampaignInProgress(
    editorStore.getState(),
  ) as VerificationCampaign;

/** apply a verifier's fixed campaign, as the verify dialog's Fix buttons do */
const loadFixedCampaign = (campaign: VerificationCampaign) =>
  editorStore.dispatch(
    campaignJsonAutoFixed({ campaign: campaign as EditorCampaign }),
  );

/** issueData as it reads after a trip through json (eg, no undefined fields) */
const asJsonData = (issueData: unknown): unknown =>
  issueData === undefined ? undefined : JSON.parse(JSON.stringify(issueData));

const verificationIssueAsJson = ({
  severity,
  verifier,
  msg,
  roomId,
  itemId,
  fixable,
  fixText,
  issueData,
}: CampaignVerificationIssue<unknown>) => ({
  severity,
  verifier: verifier.name,
  msg,
  roomId,
  itemId,
  fixable,
  fixText,
  // passed back unchanged to fixVerificationIssue to identify the issue:
  issueData: asJsonData(issueData),
});

const saveResultAsJson = (saveResult: SaveResult) =>
  saveResult.ok ?
    jsonResult({
      saved: selectCurrentCampaignInProgress(editorStore.getState()).locator,
    })
  : jsonResult({ saveFailed: saveResult.failure });

/**
 * the user ids going by a username, from the same directory the Open dialog
 * lists; users without a username all show as `anon`
 */
const userIdsForUsername = async (username: string): Promise<string[]> => {
  const { data: campaignDirectory = {} } = await editorStore.dispatch(
    editorCampaignsApiSlice.endpoints.getAllUsersLatestCampaigns.initiate(
      { publishedOnly: false },
      { forceRefetch: true },
    ),
  );
  return valuesIter(campaignDirectory)
    .filter(({ user }) => user.username === username)
    .map(({ user }) => user.id)
    .toArray();
};

/**
 * the campaign a `loadCampaign` call asks for, ignoring version - or why it
 * can't be found
 */
const requestedCampaignLocator = async (
  username: unknown,
  campaignName: unknown,
): Promise<Omit<CampaignLocator, "version"> | string> => {
  if (username === undefined && campaignName === undefined) {
    return sequelCampaignLocator;
  }
  if (typeof username !== "string" || typeof campaignName !== "string") {
    return "give both username and campaignName, or neither for the sequel";
  }
  const [userId, ...otherUserIds] = await userIdsForUsername(username);
  if (userId === undefined) {
    return `no user named ${username}`;
  }
  if (otherUserIds.length > 0) {
    return `several users are named ${username}`;
  }
  return { userId, campaignName };
};

const editorWebMcpTools: WebMCP.ModelContextTool[] = [
  {
    name: "getUsageSkill",
    description:
      "read this first: a guide (markdown) to using these editor tools well - what each does, recipes for common edits, and keeping the campaign free of verification issues",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      // loaded only when asked for, so the guide isn't in the editor's bundle:
      const { default: usageSkill } =
        await import("../../../.claude/skills/editor-webmcp/SKILL.md?raw");
      return { content: [{ type: "text", text: usageSkill }] };
    },
  },
  ...reduxWebMcpTools,
  {
    name: "getCurrentRoomId",
    description: "the id of the room the editor is currently showing",
    inputSchema: { type: "object", properties: {} },
    execute: async () =>
      jsonResult(selectCursorRoomId(editorStore.getState().levelEditor)),
  },
  {
    name: "getCurrentRoomJson",
    description: "the json of the room the editor is currently showing",
    inputSchema: { type: "object", properties: {} },
    execute: async () =>
      jsonResult(
        selectCurrentCommittedRoomJsonFromLevelEditorState(
          editorStore.getState().levelEditor,
        ),
      ),
  },
  {
    name: "getSelectedItems",
    description:
      "the items selected in the current room, as item id -> item json",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      const editorState = editorStore.getState();
      return jsonResult(
        Object.fromEntries(
          selectSelectedJsonItemIds(editorState).map((itemId) => [
            itemId,
            selectItem(editorState, itemId),
          ]),
        ),
      );
    },
  },
  {
    name: "listRooms",
    description: "every room in the open campaign, as {id, planet}",
    inputSchema: { type: "object", properties: {} },
    execute: async () =>
      jsonResult(
        valuesIter(
          selectCurrentCampaignInProgress(editorStore.getState()).rooms,
        )
          .map(({ id, planet }) => ({ id, planet }))
          .toArray(),
      ),
  },
  {
    name: "getOpenCampaign",
    description: "the open campaign's locator (user, name, version) and meta",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      const { locator, meta } = selectCurrentCampaignInProgress(
        editorStore.getState(),
      );
      return jsonResult({ locator, meta });
    },
  },
  {
    name: "getEditorView",
    description:
      "the editor's view and ui state: camera angle, current tool, current sub-room and grid resolution",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      const editorState = editorStore.getState();
      return jsonResult({
        cameraAngle: selectEditorCameraAngle(editorState),
        tool: selectTool(editorState),
        subRoomId: selectCursorSubRoomId(editorState.levelEditor),
        gridResolution: editorState.levelEditor.gridResolution,
      });
    },
  },
  {
    name: "loadCampaign",
    description:
      "load a campaign from the db into the editor, as the Open dialog does; discards unsaved changes. Omit username and campaignName for the sequel",
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "the campaign's author" },
        campaignName: { type: "string" },
        version: {
          type: "number",
          description: "the version to load; default latest",
        },
      },
    },
    async execute({ username, campaignName, version }) {
      const locatorOrProblem = await requestedCampaignLocator(
        username,
        campaignName,
      );
      if (typeof locatorOrProblem === "string") {
        return jsonResult(locatorOrProblem);
      }
      const campaignLocator = {
        ...locatorOrProblem,
        version: typeof version === "number" ? version : -1,
      };
      const campaignBefore = selectCurrentCampaignInProgress(
        editorStore.getState(),
      );
      await editorStore.dispatch(loadCampaignIntoEditor(campaignLocator));
      const campaignAfter = selectCurrentCampaignInProgress(
        editorStore.getState(),
      );
      // a failed load leaves the open campaign untouched
      return campaignAfter !== campaignBefore ?
          jsonResult({ loaded: campaignAfter.locator })
        : jsonResult({ couldNotLoad: campaignLocator });
    },
  },
  {
    name: "revertCampaign",
    description:
      "reload the open campaign as last saved, as the toolbar's revert button does; discards unsaved changes",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      const campaign = selectCurrentCampaignInProgress(editorStore.getState());
      if (!campaignIsNamed(campaign)) {
        return jsonResult(
          "the campaign has never been saved: nothing to revert to",
        );
      }
      await editorStore.dispatch(revertPressed());
      return jsonResult({
        reverted: selectCurrentCampaignInProgress(editorStore.getState())
          .locator,
      });
    },
  },
  {
    name: "addRoom",
    description:
      "add a new, unconnected room with the current room's scenery, as the toolbar's add room button does; it becomes the current room",
    inputSchema: {
      type: "object",
      properties: {
        roomSize: {
          type: "object",
          description: "size in blocks; default 8×8",
          properties: { x: { type: "number" }, y: { type: "number" } },
          required: ["x", "y"],
        },
      },
    },
    async execute({ roomSize }) {
      editorStore.dispatch(
        addRoom({ roomSize: isXy(roomSize) ? roomSize : undefined }),
      );
      return jsonResult({
        addedRoomId: selectCursorRoomId(editorStore.getState().levelEditor),
      });
    },
  },
  {
    name: "moveItemsToRoom",
    description:
      "move items from the current room to another, as dropping them on its map tile does: they keep their offset from the room's corner, nudged to the nearest whole-block spot free of collisions (sideways preferred to stacking up). Walls, floors and doors stay behind. The other room becomes the current room, with the items selected. Returns their new ids, or why they couldn't move",
    inputSchema: {
      type: "object",
      properties: {
        roomId: { type: "string", description: "the room to move them to" },
        subRoomId: {
          type: "string",
          description: "the sub-room to move them into; default the whole room",
        },
        itemIds: {
          type: "array",
          items: { type: "string" },
          description: "default the selected items",
        },
      },
      required: ["roomId"],
    },
    async execute({ roomId, subRoomId, itemIds }) {
      if (typeof roomId !== "string") {
        return jsonResult("roomId must be a string");
      }
      const { levelEditor } = editorStore.getState();
      const placement = editorStore.dispatch(
        dropItemsOnRoom({
          itemIds:
            Array.isArray(itemIds) ?
              (itemIds as EditorRoomItemId[])
            : levelEditor.selectedJsonItemIds,
          toRoomId: roomId as EditorRoomId,
          toSubRoomId: typeof subRoomId === "string" ? subRoomId : "*",
        }),
      );
      return placement === undefined ?
          jsonResult(
            "not moved: same room, unknown room, nothing movable, or nowhere free for them",
          )
        : jsonResult({
            currentRoomId: selectCursorRoomId(
              editorStore.getState().levelEditor,
            ),
            movedItemIds: selectSelectedJsonItemIds(editorStore.getState()),
          });
    },
  },
  {
    name: "insertRoom",
    description:
      "add a new room next to the current one, as the map's insert buttons do: left/right/away/towards insert beside it, up/down create a room above/below. It becomes the current room",
    inputSchema: {
      type: "object",
      properties: {
        direction: {
          type: "string",
          enum: [...directionsXyz4],
        },
      },
      required: ["direction"],
    },
    async execute({ direction }) {
      if (!isDirectionXyz4(direction)) {
        return jsonResult(
          `direction must be one of ${directionsXyz4.join(", ")}`,
        );
      }
      editorStore.dispatch(insertRoomInDirection(direction));
      return jsonResult({
        currentRoomId: selectCursorRoomId(editorStore.getState().levelEditor),
      });
    },
  },
  {
    name: "saveCampaign",
    description:
      "save the open campaign to the db as a new version, as the toolbar's save button does; give campaignName to save under that name, as the Save As dialog does. Needs the user signed in. Saving onto another existing campaign of the user's returns needsConfirmation - ask the user, then call again with overwriteConfirmed",
    inputSchema: {
      type: "object",
      properties: {
        campaignName: {
          type: "string",
          description:
            "save as this name; default the campaign's current name. Required for a never-saved campaign",
        },
        publish: {
          type: "boolean",
          description:
            "with campaignName: whether to publish; default the campaign's current setting",
        },
        overwriteConfirmed: {
          type: "boolean",
          description:
            "the user agreed to stack a new version onto the existing campaign with this name",
        },
      },
    },
    async execute({ campaignName, publish, overwriteConfirmed }) {
      const campaign = selectCurrentCampaignInProgress(editorStore.getState());
      if (typeof campaignName !== "string") {
        if (!campaignIsNamed(campaign)) {
          return jsonResult(
            "the campaign has never been saved: give a campaignName",
          );
        }
        const saveResult = await editorStore.dispatch(saveCampaign());
        editorStore.dispatch(saveOutcomeShown(saveResult));
        return saveResultAsJson(saveResult);
      }
      const saveAsResult = await editorStore.dispatch(
        saveCampaignAs({
          campaignName,
          publish:
            typeof publish === "boolean" ? publish : (
              (campaign.meta?.published ?? false)
            ),
          overwriteConfirmed: overwriteConfirmed === true,
        }),
      );
      if (saveAsResult.needsConfirmation) {
        return jsonResult({
          needsConfirmation: `${campaignName} already exists (latest version ${saveAsResult.latest}) - confirm with the user before overwriting`,
        });
      }
      editorStore.dispatch(saveOutcomeShown(saveAsResult.saveResult));
      return saveResultAsJson(saveAsResult.saveResult);
    },
  },
  {
    name: "setRoomItems",
    description:
      "add, replace or remove items in the current room, by id, as one undoable edit: each value is a whole item ({type, config, position} - see the room json) or null to remove it. Returns the room's item count. Check getVerificationIssues afterwards",
    inputSchema: {
      type: "object",
      properties: {
        items: {
          type: "object",
          description: "item id -> item json, or null to remove",
          additionalProperties: { type: ["object", "null"] },
        },
      },
      required: ["items"],
    },
    async execute({ items }) {
      if (typeof items !== "object" || items === null) {
        return jsonResult("items must be an object of id -> item or null");
      }
      const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(
        editorStore.getState().levelEditor,
      );
      const newItems: Record<string, unknown> = { ...roomJson.items };
      for (const [id, item] of Object.entries(items)) {
        if (item === null) {
          delete newItems[id];
        } else {
          newItems[id] = item;
        }
      }
      const newRoomJson: unknown = { ...roomJson, items: newItems };
      if (!validateRoomJson(newRoomJson)) {
        return jsonResult({ notApplied: validateRoomJson.errors });
      }
      editorStore.dispatch(
        roomJsonEdited({ roomJson: newRoomJson, timestamp: Date.now() }),
      );
      return jsonResult({
        roomId: newRoomJson.id,
        itemCount: Object.keys(newItems).length,
      });
    },
  },
  {
    name: "playtest",
    description:
      "play the open campaign, unsaved, as the toolbar's play button does: opens (or restarts) the local game in the `playtest` tab, in the current room. Returns the game's url, for opening it yourself if the browser blocks the tab",
    inputSchema: {
      type: "object",
      properties: {
        fromStart: {
          type: "boolean",
          description: "start at the campaign's start; default false",
        },
        playAsHeels: {
          type: "boolean",
          description: "play as heels; default false (head)",
        },
      },
    },
    async execute({ fromStart, playAsHeels }) {
      const url = await playtestUrl(editorStore.getState(), {
        baseUrl: import.meta.env.VITE_GAME_URL,
        fromStart: fromStart === true,
        playAsHeels: playAsHeels === true,
      });
      return jsonResult({
        opened: openPlaytest(url) !== undefined,
        url,
      });
    },
  },
  {
    name: "getVerificationIssues",
    description:
      "the errors and warnings found in the open campaign, as listed by the toolbar's verify button; empty when clean. `fixable` says whether `fixVerificationIssue` can auto-fix one; `fixText` describes the fix, or why there isn't one",
    inputSchema: { type: "object", properties: {} },
    execute: async () =>
      jsonResult(currentIssues().map(verificationIssueAsJson)),
  },
  {
    name: "fixVerificationIssue",
    description:
      "auto-fix one fixable issue from getVerificationIssues, as its Fix button in the verify dialog does - pass that issue's `verifier` and `issueData` unchanged. Returns the issues remaining",
    inputSchema: {
      type: "object",
      properties: {
        verifier: { type: "string", description: "the issue's `verifier`" },
        issueData: { description: "the issue's `issueData`, unchanged" },
      },
      required: ["verifier", "issueData"],
    },
    async execute({ verifier: verifierName, issueData }) {
      const verifier = allVerifiers.find(({ name }) => name === verifierName);
      if (verifier === undefined) {
        return jsonResult(`no verifier named ${String(verifierName)}`);
      }
      const campaign = openCampaign();
      // re-checked now, so a stale or already-fixed issue isn't fixed blindly:
      const issue = verifier
        .check(campaign, verificationGraph(campaign))
        .find((candidate) =>
          nanoEqual(asJsonData(candidate.issueData), issueData),
        );
      if (issue === undefined) {
        return jsonResult("that issue is no longer in the campaign");
      }
      if (!issue.fixable) {
        return jsonResult(`not auto-fixable: ${issue.fixText}`);
      }
      loadFixedCampaign(verifier.fix(campaign, issue.issueData));
      return jsonResult({
        fixed: issue.fixText,
        remainingIssues: currentIssues().map(verificationIssueAsJson),
      });
    },
  },
  {
    name: "fixAllVerificationIssues",
    description:
      "auto-fix every fixable issue, as the verify dialog's 'Fix all' button does. Returns the issues remaining",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      const fixableIssues = currentIssues().filter(({ fixable }) => fixable);
      loadFixedCampaign(
        fixableIssues.reduce(
          (campaign, issue) => issue.verifier.fix(campaign, issue.issueData),
          openCampaign(),
        ),
      );
      return jsonResult({
        fixed: fixableIssues.map(({ fixText }) => fixText),
        remainingIssues: currentIssues().map(verificationIssueAsJson),
      });
    },
  },
];

/**
 * registers the editor's tools with the browser's webmcp api, for the editor's
 * whole lifetime. Unconditional, but does nothing in a browser without webmcp
 */
export const registerEditorWebMcpTools = () => {
  const modelContext = getModelContext();
  if (modelContext === undefined) {
    return;
  }
  for (const tool of editorWebMcpTools) {
    modelContext.registerTool(tool);
  }
};
