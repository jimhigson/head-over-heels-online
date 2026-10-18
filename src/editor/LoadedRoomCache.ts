import { buildRoomJsonDirectionalIndex } from "../game/gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../game/gameState/loadRoom/loadItemFromJson";
import { addItemToRoom } from "../game/gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../game/gameState/mutators/deleteItemFromRoom";
import { roomItemsIterable } from "../model/roomItemsInPlayIterators";
import {
  roomJsonItemsEntriesIterable,
  roomJsonItemsIterable,
} from "../model/RoomJsonItemIterators";
import { errorCaught } from "../store/slices/errors/errorsSlice";
import { type EditorAppStore } from "../store/store";
import { createSerialisableErrors } from "../utils/redux/createSerialisableErrors";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "./editorTypes";
import { selectCurrentEditingRoomJsonWithPreviews } from "./slice/levelEditorSelectors";
import { selectCurrentCommittedRoomJson } from "./slice/levelEditorSlice";
import { loadEditorRoom } from "./slice/loadEditorRoom";

type LoadedRoom = {
  /**
   * 'in play' room state, patched in-place for most changes, replaced only if necessary such as
   * on a full reload
   */
  roomState: EditorRoomState;
  /**
   * the json (with previews) that the loaded room matches
   */
  roomJsonWithPreviews: EditorRoomJson;
  /**
   * the committed json when the loaded room was last brought up to date
   */
  committedRoomJson: EditorRoomJson;
};

/**
 * a loaded room that follows the store: the authoritative record of the room
 * as it is currently rendered, previews included, in the same in-play format
 * used during gameplay. Everything that needs the loaded room - the renderer,
 * pointer picking, the render extents, nudging - reads the one instance, so
 * they all see the same items (by identity, not just by id), which is what
 * makes the renderer's render boxes usable outside the renderer.
 *
 * It follows the store from its creation: patched in place for edits and
 * previews (much cheaper than reloading), and reloaded when the room changes or
 * edits are committed. Redux tells its subscribers before a dispatch returns,
 * so it is up to date for any code that reads it after a dispatch.
 *
 * A room that fails to load (eg from stale persisted state) is reported to the
 * store as a caught error, and loading is retried once the room's json changes
 */
export class LoadedRoomCache {
  /**
   * undefined while the store's current room has failed to load
   */
  #loaded: LoadedRoom | undefined;
  /**
   * the json of the room that last failed to load
   */
  #failedRoomJsonWithPreviews: EditorRoomJson | undefined = undefined;
  #revision = 0;
  readonly #store: EditorAppStore;
  readonly #listeners = new Set<() => void>();

  constructor(
    /** the store to follow */
    store: EditorAppStore,
  ) {
    this.#store = store;
    const state = store.getState();
    this.#loaded = this.#tryLoad(
      selectCurrentEditingRoomJsonWithPreviews(state),
      selectCurrentCommittedRoomJson(state),
    );
    // the cache lives as long as the store, so never unsubscribes:
    store.subscribe(() => this.#bringUpToDate());
  }

  /**
   * the loaded room. Its identity only changes on a full reload, since edits
   * patch it in place
   */
  getRoomState = (): EditorRoomState => {
    const maybeLoaded = this.#loaded;
    if (import.meta.env.DEV && maybeLoaded === undefined) {
      throw new Error("the editor's room was read but had failed to load");
    }
    return maybeLoaded!.roomState;
  };

  /** counts the changes to the room's contents */
  get revision(): number {
    return this.#revision;
  }

  /**
   * Subscribers are told after each change to the room's contents.
   * Returns the unsubscribe function
   */
  subscribe = (listener: () => void): (() => void) => {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  };

  /**
   * make the loaded room match the store's current room, previews included -
   * either by patching or full reload, or leave it be if nothing has changed
   */
  #bringUpToDate() {
    const state = this.#store.getState();
    const roomJsonWithPreviews =
      selectCurrentEditingRoomJsonWithPreviews(state);
    const committedRoomJson = selectCurrentCommittedRoomJson(state);
    const loaded = this.#loaded;

    if (loaded === undefined) {
      // retrying the same json would fail again, and report the error again:
      if (roomJsonWithPreviews !== this.#failedRoomJsonWithPreviews) {
        this.#loaded = this.#tryLoad(roomJsonWithPreviews, committedRoomJson);
        this.#changed();
      }
      return;
    }

    const prevRoomJsonWithPreviews = loaded.roomJsonWithPreviews;
    const loadedRoomState = loaded.roomState;

    // both come from caching selectors, so are referentially unequal to the
    // previous values only if something has changed:
    if (
      prevRoomJsonWithPreviews === roomJsonWithPreviews &&
      loaded.committedRoomJson === committedRoomJson
    ) {
      return;
    }

    const needsFullReload =
      // patching in place over committed edits is generally fine, but some
      // items like lightBeams from lamps benefit from a full reload of the
      // room, so committing takes the slower but more thorough path:
      loaded.committedRoomJson !== committedRoomJson ||
      loadedRoomState.id !== roomJsonWithPreviews.id ||
      prevRoomJsonWithPreviews.planet !== roomJsonWithPreviews.planet ||
      prevRoomJsonWithPreviews.color !== roomJsonWithPreviews.color;

    if (needsFullReload) {
      this.#loaded = this.#tryLoad(roomJsonWithPreviews, committedRoomJson);
    } else {
      patchLoadedRoomInPlace(
        loadedRoomState,
        prevRoomJsonWithPreviews,
        roomJsonWithPreviews,
        committedRoomJson,
      );
      loaded.roomJsonWithPreviews = roomJsonWithPreviews;
      loaded.committedRoomJson = committedRoomJson;
    }

    this.#changed();
  }

  /**
   * loads a room, or reports to the store why it couldn't
   */
  #tryLoad(
    roomJsonWithPreviews: EditorRoomJson,
    committedRoomJson: EditorRoomJson,
  ): LoadedRoom | undefined {
    try {
      return {
        roomState: loadEditorRoom(roomJsonWithPreviews),
        roomJsonWithPreviews,
        committedRoomJson,
      };
    } catch (e) {
      // marked failed before dispatching, since the dispatch re-enters #bringUpToDate:
      this.#loaded = undefined;
      this.#failedRoomJsonWithPreviews = roomJsonWithPreviews;
      this.#store.dispatch(errorCaught(createSerialisableErrors(e)));
      return undefined;
    }
  }

  #changed() {
    this.#revision++;
    for (const listener of this.#listeners) {
      listener();
    }
  }
}

/** brings a loaded room in line with changed json, item by item */
const patchLoadedRoomInPlace = (
  loadedRoomState: EditorRoomState,
  /** the json the loaded room matches */
  prevRoomJsonWithPreviews: EditorRoomJson,
  /** the json to make it match */
  roomJsonWithPreviews: EditorRoomJson,
  committedRoomJson: EditorRoomJson,
) => {
  const directionalIndex = buildRoomJsonDirectionalIndex(
    roomJsonItemsIterable(roomJsonWithPreviews),
  );

  const deleteInPlayItemsForJsonId = (
    jsonItemId: EditorRoomItemId,
  ): EditorUnionOfAllItemInPlayTypes[] => {
    const deletedItems = roomItemsIterable(loadedRoomState.items)
      .filter((existingItem) => existingItem.jsonItemId === jsonItemId)
      .toArray();
    for (const deletedItem of deletedItems) {
      deleteItemFromRoom({ room: loadedRoomState, item: deletedItem });
    }
    return deletedItems;
  };

  const addInPlayItemsForJsonItem = (
    jsonItemId: EditorRoomItemId,
    jsonItem: EditorJsonItemUnion,
  ) => {
    for (const newItem of loadItemFromJson<EditorRoomId, EditorRoomItemId>(
      jsonItemId,
      jsonItem,
      roomJsonWithPreviews,
      directionalIndex,
    )) {
      addItemToRoom({
        room: loadedRoomState,
        item: newItem as EditorUnionOfAllItemInPlayTypes,
      });
    }
  };

  const updateItemsOverriddenByPreview = (
    id: EditorRoomItemId,
    prevItem: EditorJsonItemUnion | undefined,
    deletedItems: EditorUnionOfAllItemInPlayTypes[],
  ) => {
    const committedItem = committedRoomJson.items[id];
    if (prevItem !== undefined && prevItem === committedItem) {
      // the deleted in-play items were loaded from the committed json:
      for (const deletedItem of deletedItems) {
        loadedRoomState.itemsOverriddenByPreview[deletedItem.id] = deletedItem;
      }
    }
    if (roomJsonWithPreviews.items[id] === committedItem) {
      // back as committed, so no longer overridden by the preview:
      for (const overriddenItem of roomItemsIterable(
        loadedRoomState.itemsOverriddenByPreview,
      )) {
        if (overriddenItem.jsonItemId === id) {
          delete loadedRoomState.itemsOverriddenByPreview[overriddenItem.id];
        }
      }
    }
  };

  for (const [id, item] of roomJsonItemsEntriesIterable(
    roomJsonWithPreviews.items,
  )) {
    const prevItem = prevRoomJsonWithPreviews.items[id];
    if (prevItem !== item) {
      const wasAdded = prevItem === undefined;
      const deletedItems = wasAdded ? [] : deleteInPlayItemsForJsonId(id);
      updateItemsOverriddenByPreview(id, prevItem, deletedItems);
      addInPlayItemsForJsonItem(id, item);
    }
  }
  for (const [id, prevItem] of roomJsonItemsEntriesIterable(
    prevRoomJsonWithPreviews.items,
  )) {
    const wasRemoved = roomJsonWithPreviews.items[id] === undefined;
    if (wasRemoved) {
      const deletedItems = deleteInPlayItemsForJsonId(id);
      updateItemsOverriddenByPreview(id, prevItem, deletedItems);
    }
  }
};
