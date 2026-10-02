import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useCallback, useContext, useEffect, useRef } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { buildRoomJsonDirectionalIndex } from "../game/gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../game/gameState/loadRoom/loadItemFromJson";
import { addItemToRoom } from "../game/gameState/mutators/addItemToRoom";
import { deleteItemFromRoom } from "../game/gameState/mutators/deleteItemFromRoom";
import {
  roomJsonItemsEntriesIterable,
  roomJsonItemsIterable,
} from "../model/RoomJson";
import { roomItemsIterable } from "../model/RoomState";
import { startEditorListening } from "../store/listenerMiddleware";
import { useEditorAppSelector } from "../store/store";
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

/**
 * a new one of these is minted whenever the room's contents change - the room
 * itself is patched in place, so its identity is stable across edits and it is
 * this value that says "something changed" to memoised consumers
 */
export type EditorRoomStateContextValue = {
  /**
   * the room as currently loaded, in the same in-play format used during
   * gameplay, with any previewed (uncommitted) edits applied
   */
  roomState: EditorRoomState;
  /**
   * the same room, but read at the moment of the call - for event handlers and
   * ticks, which run long after the render that gave them the context. Its
   * identity never changes, so effects can depend on it freely
   */
  getRoomState: () => EditorRoomState;
  /** counts the changes to the room's contents */
  revision: number;
};

const EditorRoomStateContext = createContext<
  EditorRoomStateContextValue | undefined
>(undefined);

/**
 * owns the single loaded room state for the editor: the authoritative record of
 * the room as it is currently rendered, previews included. Everything that
 * needs the loaded room - the renderer, pointer picking, the render extents -
 * reads it from here, so they all see the same items (by identity, not just by
 * id), which is what makes the renderer's render boxes usable outside the
 * renderer.
 */
export const EditorRoomStateProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const roomJsonWithPreviews = useEditorAppSelector(
    selectCurrentEditingRoomJsonWithPreviews,
  );
  const committedRoomJson = useEditorAppSelector(
    selectCurrentCommittedRoomJson,
  );
  /** the loaded room; replaced only on a full reload, patched in place otherwise */
  const roomStateRef = useRef<EditorRoomState | undefined>(undefined);
  /** the last json (with previews) that {@link roomStateRef} matches */
  const prevRoomJsonWithPreviewsRef = useRef<EditorRoomJson | undefined>(
    undefined,
  );
  const revisionRef = useRef(0);
  /** the context value, re-minted only when the revision moves on */
  const valueRef = useRef<EditorRoomStateContextValue | undefined>(undefined);

  // caching the patched-in-place room state over committed edits is generally fine,
  // but some items like lightBeams from lamps benefit from a full reload of the room,
  // so on committing edits take it down the slower but more thorough path of creating
  // a new preview, not the quick one shown during editing
  useEffect(() => {
    return startEditorListening({
      predicate(_action, currentState, previousState) {
        const currentCommittedRoomJson =
          selectCurrentCommittedRoomJson(currentState);
        const previousCommittedRoomJson =
          selectCurrentCommittedRoomJson(previousState);

        return currentCommittedRoomJson !== previousCommittedRoomJson;
      },
      effect(_action, { getState }) {
        const latestCommittedRoomJson =
          selectCurrentCommittedRoomJson(getState());

        roomStateRef.current = loadEditorRoom(latestCommittedRoomJson);
        revisionRef.current++;
        // assuming there hasn't been time to make any previews yet:
        prevRoomJsonWithPreviewsRef.current = latestCommittedRoomJson;
      },
    });
  }, []);

  // since roomJsonWithPreviews comes from a caching selector, it will be referentially unequal to the
  // previous value if  something has changed. Only mutate the state to match roomJsonWithPreviews in
  // this case:
  if (prevRoomJsonWithPreviewsRef.current !== roomJsonWithPreviews) {
    const prevRoomJsonWithPreviews = prevRoomJsonWithPreviewsRef.current;
    const loadedRoomState = roomStateRef.current;

    const needsFullReload =
      prevRoomJsonWithPreviews === undefined ||
      loadedRoomState === undefined ||
      loadedRoomState.id !== roomJsonWithPreviews.id ||
      prevRoomJsonWithPreviews.planet !== roomJsonWithPreviews.planet ||
      prevRoomJsonWithPreviews.color !== roomJsonWithPreviews.color;

    if (needsFullReload) {
      // first render or room switch — full load
      roomStateRef.current = loadEditorRoom(roomJsonWithPreviews);
    } else {
      // mutate roomState in-place (much cheaper than reloading)
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
            loadedRoomState.itemsOverriddenByPreview[deletedItem.id] =
              deletedItem;
          }
        }
        if (roomJsonWithPreviews.items[id] === committedItem) {
          // back as committed, so no longer overridden by the preview:
          for (const overriddenItem of roomItemsIterable(
            loadedRoomState.itemsOverriddenByPreview,
          )) {
            if (overriddenItem.jsonItemId === id) {
              delete loadedRoomState.itemsOverriddenByPreview[
                overriddenItem.id
              ];
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
    }

    revisionRef.current++;
    prevRoomJsonWithPreviewsRef.current = roomJsonWithPreviews;
  }

  const getRoomState = useCallback(() => {
    const maybeRoomState = roomStateRef.current;
    if (import.meta.env.DEV && maybeRoomState === undefined) {
      throw new Error(
        "the editor's room state was read before it was first loaded",
      );
    }
    return maybeRoomState!;
  }, []);

  const previousValue = valueRef.current;
  if (
    previousValue === undefined ||
    previousValue.revision !== revisionRef.current
  ) {
    valueRef.current = {
      roomState: getRoomState(),
      getRoomState,
      revision: revisionRef.current,
    };
  }

  return (
    <EditorRoomStateContext.Provider value={valueRef.current}>
      {children}
    </EditorRoomStateContext.Provider>
  );
};

export const useEditorRoomStateContext = (): EditorRoomStateContextValue => {
  const contextValue = useContext(EditorRoomStateContext);
  if (contextValue === undefined) {
    throw new Error(
      "useEditorRoomStateContext must be used inside EditorRoomStateProvider",
    );
  }
  return contextValue;
};

/**
 * for reading the loaded room at the moment of an interaction (event handlers,
 * ticks) - the returned getter is stable, so it can be depended on without
 * re-running effects as the room changes
 */
export const useGetEditorRoomState = (): (() => EditorRoomState) =>
  useEditorRoomStateContext().getRoomState;

/**
 * the loaded room for rendering: the component re-renders whenever the room
 * changes, but note that the returned object's identity only changes on a full
 * reload (a room switch), since edits patch it in place
 */
export const useEditorRoomState = (): EditorRoomState =>
  useEditorRoomStateContext().roomState;
