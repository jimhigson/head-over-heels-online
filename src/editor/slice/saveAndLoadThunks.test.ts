import { produce } from "immer";
import { expect, test, vi } from "vitest";

import {
  getLatestCampaignVersionViaApi,
  saveCampaignViaApi,
} from "../../store/slices/campaigns/campaignApiHelpers";
import { type EditorRootState } from "../../store/store";
import {
  levelEditorSlice,
  type LevelEditorSliceAction,
  type LevelEditorState,
} from "./levelEditorSlice";
import { editorStateWithOneRoomWithNoItems } from "./reducers/__test__/storeStates";
import { saveCampaignAs } from "./saveAndLoadThunks";

vi.mock("../../store/slices/campaigns/campaignApiHelpers", () => ({
  getLatestCampaignVersionViaApi: vi.fn(),
  saveCampaignViaApi: vi.fn(),
  loadCampaignFromApi: vi.fn(),
}));

vi.mock("../../db/supabaseDb.import", () => ({
  importSupabaseDb: async () => ({
    supabaseDb: {
      auth: {
        // matches editorStateWithOneRoomWithNoItems's locator userId
        getUser: async () => ({
          data: { user: { id: "testUserId" } },
          error: null,
        }),
      },
    },
  }),
}));

const mockGetLatestVersion = vi.mocked(getLatestCampaignVersionViaApi);
const mockSave = vi.mocked(saveCampaignViaApi);

/**
 * run a thunk against a real slice reducer: dispatched actions are recorded and
 * reduced so nested thunks (saveCampaign) see state updated by earlier dispatches
 */
const runThunk = async <T>(
  initialState: LevelEditorState,
  thunk: (
    dispatch: (actionOrThunk: unknown) => unknown,
    getState: () => EditorRootState,
  ) => Promise<T>,
) => {
  let sliceState = initialState;
  const dispatched: Array<LevelEditorSliceAction> = [];
  const getState = () => ({ levelEditor: sliceState }) as EditorRootState;
  const dispatch = (actionOrThunk: unknown): unknown => {
    if (typeof actionOrThunk === "function") {
      return actionOrThunk(dispatch, getState);
    }
    const action = actionOrThunk as LevelEditorSliceAction;
    dispatched.push(action);
    sliceState = levelEditorSlice.reducer(sliceState, action);
    return action;
  };
  const result = await thunk(dispatch, getState);
  return { result, dispatched, finalState: () => sliceState };
};

const stateAtVersion7 = produce(editorStateWithOneRoomWithNoItems, (draft) => {
  draft.campaignInProgress.locator.version = 7;
});

test("save-as a never-saved name saves without a lease (the original false-conflict bug)", async () => {
  mockGetLatestVersion.mockResolvedValue({ data: 0 } as Awaited<
    ReturnType<typeof getLatestCampaignVersionViaApi>
  >);
  mockSave.mockResolvedValue({ data: { ok: true, version: 1 } } as Awaited<
    ReturnType<typeof saveCampaignViaApi>
  >);

  const { result } = await runThunk(stateAtVersion7, (dispatch, getState) =>
    saveCampaignAs({ campaignName: "aFreshName", publish: false })(
      dispatch as Parameters<ReturnType<typeof saveCampaignAs>>[0],
      getState,
      undefined,
    ),
  );

  expect(result).toEqual({
    needsConfirmation: false,
    saveResult: { ok: true, version: 1 },
  });
  expect(mockSave).toHaveBeenCalledWith(
    expect.objectContaining({
      locator: expect.objectContaining({
        campaignName: "aFreshName",
        userId: "testUserId",
      }),
    }),
    { baseVersion: null, force: false },
  );
});

test("save-as onto an existing name asks for confirmation without mutating state", async () => {
  mockGetLatestVersion.mockResolvedValue({ data: 18 } as Awaited<
    ReturnType<typeof getLatestCampaignVersionViaApi>
  >);
  mockSave.mockClear();

  const { result, dispatched } = await runThunk(
    stateAtVersion7,
    (dispatch, getState) =>
      saveCampaignAs({ campaignName: "existingName", publish: false })(
        dispatch as Parameters<ReturnType<typeof saveCampaignAs>>[0],
        getState,
        undefined,
      ),
  );

  expect(result).toEqual({ needsConfirmation: true, latest: 18 });
  expect(dispatched).toEqual([]);
  expect(mockSave).not.toHaveBeenCalled();
});

test("confirmed save-as onto an existing name leases against the fetched latest", async () => {
  mockGetLatestVersion.mockResolvedValue({ data: 18 } as Awaited<
    ReturnType<typeof getLatestCampaignVersionViaApi>
  >);
  mockSave.mockResolvedValue({ data: { ok: true, version: 19 } } as Awaited<
    ReturnType<typeof saveCampaignViaApi>
  >);

  const { result } = await runThunk(stateAtVersion7, (dispatch, getState) =>
    saveCampaignAs({
      campaignName: "existingName",
      publish: false,
      overwriteConfirmed: true,
    })(
      dispatch as Parameters<ReturnType<typeof saveCampaignAs>>[0],
      getState,
      undefined,
    ),
  );

  expect(result).toEqual({
    needsConfirmation: false,
    saveResult: { ok: true, version: 19 },
  });
  expect(mockSave).toHaveBeenCalledWith(expect.anything(), {
    baseVersion: 18,
    force: false,
  });
});

test("save-as with the name unchanged is a plain save keeping the existing lease", async () => {
  mockGetLatestVersion.mockClear();
  mockSave.mockResolvedValue({ data: { ok: true, version: 8 } } as Awaited<
    ReturnType<typeof saveCampaignViaApi>
  >);

  const { result } = await runThunk(stateAtVersion7, (dispatch, getState) =>
    saveCampaignAs({ campaignName: "testCampaign", publish: true })(
      dispatch as Parameters<ReturnType<typeof saveCampaignAs>>[0],
      getState,
      undefined,
    ),
  );

  expect(result).toEqual({
    needsConfirmation: false,
    saveResult: { ok: true, version: 8 },
  });
  expect(mockGetLatestVersion).not.toHaveBeenCalled();
  expect(mockSave).toHaveBeenCalledWith(expect.anything(), {
    baseVersion: 7,
    force: false,
  });
});
