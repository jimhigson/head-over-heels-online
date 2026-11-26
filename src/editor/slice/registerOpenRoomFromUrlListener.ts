import nanoEqual from "nano-equal";

import { campaignLocatorFromUrl } from "../../options/campaignLocatorFromUrl";
import type { TypedURLSearchParams } from "../../options/queryParams";
import { startEditorListening } from "../../store/listenerMiddleware";
import { levelEditorPersistKey } from "../../store/persist/levelEditorPersist";
import type { EditorRootState, EditorThunk } from "../../store/store";
import { isRehydrateFor } from "../../utils/redux/isRehydrateFor";
import type { EditorRoomId } from "../editorTypes";
import { confirm } from "../toolbar/confirm";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import {
  changeToRoom,
  selectCampaignHasUnsavedChanges,
  selectCurrentCampaignInProgress,
} from "./levelEditorSlice";
import { loadCampaignIntoEditor } from "./saveAndLoadThunks";

/**
 * whether opening another campaign would lose work
 */
const selectHasWorkToLose = (state: EditorRootState) =>
  selectCampaignHasUnsavedChanges(state) &&
  // an untouched new campaign has never been saved, but holds no work:
  !nanoEqual(
    selectCurrentCampaignInProgress(state),
    initialLevelEditorSliceState.campaignInProgress,
  );

/**
 * open the campaign and room the page's url names, if it names a campaign. A
 * campaign already being edited keeps its unsaved changes; replacing another's
 * is confirmed first
 */
const openRoomFromUrlThunk =
  (): EditorThunk<Promise<void>> => async (dispatch, getState) => {
    const locator = campaignLocatorFromUrl();
    if (locator === undefined) {
      return;
    }

    const url = new URL(window.location.href);
    const roomId = decodeURIComponent(url.hash.substring(1)) as EditorRoomId;

    // so that reloading the page keeps work done since, not opening this again:
    const searchParams = url.searchParams as TypedURLSearchParams;
    searchParams.delete("campaignName");
    searchParams.delete("campaignAuthorUserId");
    url.hash = "";
    window.history.replaceState(window.history.state, "", url);

    const isBeingEdited = () => {
      const { locator: editingLocator } =
        selectCurrentCampaignInProgress(getState());
      return (
        editingLocator.userId === locator.userId &&
        editingLocator.campaignName === locator.campaignName
      );
    };
    const campaignHasRoom = () =>
      selectCurrentCampaignInProgress(getState()).rooms[roomId] !== undefined;

    if (!isBeingEdited() || !campaignHasRoom()) {
      if (
        selectHasWorkToLose(getState()) &&
        !(await confirm({
          heading: "Open campaign",
          body: `You have unsaved changes. Opening ‘${locator.campaignName}’ will discard them.`,
          cancelText: "Cancel",
          okText: "Discard and open",
        }))
      ) {
        return;
      }
      await dispatch(loadCampaignIntoEditor(locator));
    }

    // the campaign may have failed to load, leaving another being edited:
    if (isBeingEdited() && campaignHasRoom()) {
      dispatch(changeToRoom(roomId));
    }
  };

/**
 * once the editor's state is restored from storage, open whatever the page's url
 * names - sooner, and the restored state would replace it
 */
export const registerOpenRoomFromUrlListener = () => {
  startEditorListening({
    matcher: isRehydrateFor(levelEditorPersistKey),
    effect(_action, { dispatch }) {
      dispatch(openRoomFromUrlThunk());
    },
  });
};
