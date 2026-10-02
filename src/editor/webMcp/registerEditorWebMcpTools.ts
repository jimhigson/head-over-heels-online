import nanoEqual from "nano-equal";

import { sequelCampaignLocator } from "../../gameInfo";
import { allVerifiers } from "../../model/json/verification/allVerifiers";
import { type CampaignVerificationIssue } from "../../model/json/verification/CampaignVerification";
import { verificationGraph } from "../../model/json/verification/helpers/verificationGraph";
import { type VerificationCampaign } from "../../model/json/verification/verificationTypes";
import { type CampaignLocator } from "../../model/modelTypes";
import { editorCampaignsApiSlice } from "../../store/slices/campaigns/editorCampaignsApiSlice";
import { editorStore } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import { type Xy } from "../../utils/vectors/vectors";
import { jsonResult } from "../../webMcp/jsonResult";
import { getModelContext } from "../../webMcp/modelContext";
import { reduxWebMcpTools } from "../../webMcp/reduxWebMcpTools";
import { type EditorCampaign } from "../editorTypes";
import { selectCursorRoomId } from "../slice/levelEditorSelectors";
import {
  addRoom,
  campaignJsonAutoFixed,
  selectCurrentCampaignInProgress,
} from "../slice/levelEditorSlice";
import { loadCampaignIntoEditor } from "../slice/saveAndLoadThunks";
import { selectVerification } from "../verify/useVerifyCampaign";

const isXy = (value: unknown): value is Xy =>
  typeof value === "object" &&
  value !== null &&
  "x" in value &&
  typeof value.x === "number" &&
  "y" in value &&
  typeof value.y === "number";

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
