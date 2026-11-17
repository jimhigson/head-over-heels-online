import { buildRoomJsonDirectionalIndex } from "../../game/gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import { addItemToRoom } from "../../game/gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../../game/gameState/mutators/deleteItemFromRoom";
import { roomItemsIterable } from "../../model/roomItemsInPlayIterators";
import {
  roomJsonItemsEntriesIterable,
  roomJsonItemsIterable,
} from "../../model/RoomJsonItemIterators";
import { errorCaught } from "../../store/slices/errors/errorsSlice";
import { noPlanetsLiberated } from "../../store/slices/gameInPlay/gameInPlaySlice";
import { type EditorAppStore, type EditorRootState } from "../../store/store";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { type Xy } from "../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { selectRoomJsonWithPreviews } from "../slice/levelEditorSelectors";
import { selectRoom } from "../slice/levelEditorSlice";
import { loadEditorRoom } from "../slice/loadEditorRoom";
import { type OpenRoomId } from "../slice/OpenRoom";
import { maybeLayoutNode } from "../slice/PaneLayout";
import { selectCrosshairJsonItemId } from "../slice/selectCrosshairJsonItemId";
import { crosshairParticles } from "./crosshairParticles";

/**
 * the json an open room's loaded room follows. Both come from caching
 * selectors - a changed identity is taken to mean a changed room
 */
type RoomJsons = {
  roomId: EditorRoomId;
  /**
   * the json to load - previews included, if the open room edits its room
   */
  roomJsonWithPreviews: EditorRoomJson;
  /**
   * the committed json of the same room
   */
  committedRoomJson: EditorRoomJson;
};

type Crosshair = {
  jsonItemId: EditorRoomItemId;
  /**
   * the open room's camera angle it was made for
   */
  cameraAngle: Xy;
  roomState: EditorRoomState;
  particles: EditorUnionOfAllItemInPlayTypes[];
};

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
 * an open room's loaded room, following the store: the authoritative record of
 * the room as it is currently rendered, previews included, in the same in-play format
 * used during gameplay. Everything that needs the loaded room - the renderer,
 * pointer picking, the render extents, nudging - reads the one instance, so
 * they all see the same items (by identity, not just by id), which is what
 * makes the renderer's render boxes usable outside the renderer.
 *
 * It follows the store from its creation until it is disposed: patched in place for edits and
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
  /**
   * the particles of the crosshair shown on an item, in the loaded room they
   * were added to
   */
  #crosshair: Crosshair | undefined = undefined;
  readonly #store: EditorAppStore;
  readonly #openRoomId: OpenRoomId;
  readonly #listeners = new Set<() => void>();
  readonly #unsubscribeFromStore: () => void;

  constructor(
    /**
     * the store to follow
     */
    store: EditorAppStore,
    /**
     * the open room whose room it loads - in the store as it is made
     */
    openRoomId: OpenRoomId,
  ) {
    this.#store = store;
    this.#openRoomId = openRoomId;
    const maybeRoomJsons = this.#roomJsons(store.getState());
    if (import.meta.env.DEV && maybeRoomJsons === undefined) {
      throw new Error(`open room ${openRoomId} is not in the store`);
    }
    this.#loaded = this.#tryLoad(maybeRoomJsons!);
    this.#bringCrosshairUpToDate(store.getState(), true);
    this.#unsubscribeFromStore = store.subscribe(() => this.#bringUpToDate());
  }

  /**
   * undefined once the open room (or its room) has left the store - it is
   * disposed of soon after
   */
  #roomJsons(state: EditorRootState): RoomJsons | undefined {
    const openRoom = maybeLayoutNode(
      state.levelEditor.layout,
      this.#openRoomId,
    );
    if (openRoom === undefined) {
      return undefined;
    }
    const { roomId, editable } = openRoom;
    const committedRoomJson = selectRoom(state, roomId);
    const roomJsonWithPreviews =
      editable ? selectRoomJsonWithPreviews(state, roomId) : committedRoomJson;
    if (committedRoomJson === undefined || roomJsonWithPreviews === undefined) {
      return undefined;
    }
    return { roomId, roomJsonWithPreviews, committedRoomJson };
  }

  /** stop following the store */
  dispose() {
    this.#unsubscribeFromStore();
    this.#listeners.clear();
  }

  /**
   * the loaded room. Its identity only changes on a full reload, since edits
   * patch it in place
   */
  getRoomState = (): EditorRoomState => {
    const maybeLoaded = this.#loaded;
    if (import.meta.env.DEV && maybeLoaded === undefined) {
      throw new Error("a loaded room was read but had failed to load");
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
   * make the loaded room match the store: its room json, and the crosshair
   */
  #bringUpToDate() {
    const state = this.#store.getState();
    const roomJsons = this.#roomJsons(state);
    // closed, so nothing left to follow:
    if (roomJsons === undefined) {
      return;
    }
    const roomChanged = this.#bringRoomUpToDate(roomJsons);
    const crosshairChanged = this.#bringCrosshairUpToDate(state, roomChanged);
    if (roomChanged || crosshairChanged) {
      this.#changed();
    }
  }

  /**
   * show the crosshair on whichever item it should be on now, if any.
   * Returns whether it changed
   */
  #bringCrosshairUpToDate(
    state: EditorRootState,
    /**
     * the room's contents have changed, so the crosshair may need to too,
     * even on the same item
     */
    roomChanged: boolean,
  ): boolean {
    const jsonItemId = selectCrosshairJsonItemId(state, this.#openRoomId);
    const openRoom = maybeLayoutNode(
      state.levelEditor.layout,
      this.#openRoomId,
    );
    if (openRoom === undefined) {
      return false;
    }
    const { cameraAngle } = openRoom;
    const prevCrosshair = this.#crosshair;
    if (
      !roomChanged &&
      jsonItemId === prevCrosshair?.jsonItemId &&
      (prevCrosshair === undefined || cameraAngle === prevCrosshair.cameraAngle)
    ) {
      return false;
    }

    if (
      prevCrosshair !== undefined &&
      prevCrosshair.roomState === this.#loaded?.roomState
    ) {
      for (const particle of prevCrosshair.particles) {
        deleteItemFromRoom({ room: prevCrosshair.roomState, item: particle });
      }
    }
    this.#crosshair = undefined;

    const loaded = this.#loaded;
    if (jsonItemId === undefined || loaded === undefined) {
      return prevCrosshair !== undefined;
    }

    const particles = crosshairParticles(
      loaded.roomState,
      loaded.roomJsonWithPreviews,
      jsonItemId,
      cameraAngle,
    );
    for (const particle of particles) {
      addItemToRoom({ room: loaded.roomState, item: particle });
    }
    this.#crosshair = {
      jsonItemId,
      cameraAngle,
      roomState: loaded.roomState,
      particles,
    };
    return true;
  }

  /**
   * make the loaded room match the room json it follows -
   * either by patching or full reload, or leave it be if nothing has changed.
   * Returns whether it changed
   */
  #bringRoomUpToDate(roomJsons: RoomJsons): boolean {
    const { roomId, roomJsonWithPreviews, committedRoomJson } = roomJsons;
    const loaded = this.#loaded;

    if (loaded === undefined) {
      // retrying the same json would fail again, and report the error again:
      if (roomJsonWithPreviews !== this.#failedRoomJsonWithPreviews) {
        this.#loaded = this.#tryLoad(roomJsons);
        return true;
      }
      return false;
    }

    const prevRoomJsonWithPreviews = loaded.roomJsonWithPreviews;
    const loadedRoomState = loaded.roomState;

    // both come from caching selectors, so are referentially unequal to the
    // previous values only if something has changed:
    if (
      prevRoomJsonWithPreviews === roomJsonWithPreviews &&
      loaded.committedRoomJson === committedRoomJson
    ) {
      return false;
    }

    const needsFullReload =
      // patching in place over committed edits is generally fine, but some
      // items like lightBeams from lamps benefit from a full reload of the
      // room, so committing takes the slower but more thorough path:
      loaded.committedRoomJson !== committedRoomJson ||
      loadedRoomState.id !== roomId ||
      prevRoomJsonWithPreviews.planet !== roomJsonWithPreviews.planet ||
      prevRoomJsonWithPreviews.color !== roomJsonWithPreviews.color;

    if (needsFullReload) {
      this.#loaded = this.#tryLoad(roomJsons);
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

    return true;
  }

  /**
   * loads a room, or reports to the store why it couldn't
   */
  #tryLoad({
    roomId,
    roomJsonWithPreviews,
    committedRoomJson,
  }: RoomJsons): LoadedRoom | undefined {
    try {
      return {
        roomState: loadEditorRoom(roomId, roomJsonWithPreviews),
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
      // the editor plays no game, so has liberated no planets:
      noPlanetsLiberated,
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
