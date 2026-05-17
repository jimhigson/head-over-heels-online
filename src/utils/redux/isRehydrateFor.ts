import { type Action } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

/**
 * Shape of a redux-persist REHYDRATE action narrowed to a specific
 * persistConfig key (and, optionally, a known payload shape).
 *
 * @template K  literal type of the persistConfig.key
 * @template P  shape of the persisted state for that slice
 */
export type RehydrateActionFor<K extends string, P = unknown> = Action<
  typeof REHYDRATE
> & {
  key: K;
  payload?: P;
};

/**
 * Factory that returns a type-narrowing predicate matching only the
 * redux-persist REHYDRATE action for a given persistConfig key.
 *
 * redux-persist dispatches one REHYDRATE action per persisted slice at
 * startup (and on `persistor.purge()`/replay), each carrying the
 * persistConfig's `key` field. Use this predicate in
 * `extraReducers.addMatcher` or listener-middleware `matcher` to make a
 * handler fire only on the rehydration of one specific slice (rather than
 * once per persisted slice in the app).
 *
 * The optional `P` type parameter constrains the payload type — supply it
 * inside a slice's own `extraReducers` where the persisted shape is known.
 * In a listener that doesn't care about the payload, omit `P` and it
 * defaults to `unknown`.
 *
 * @example
 * ```ts
 * // listener middleware — payload not needed
 * const isGameInPlayRehydrate = isRehydrateFor(gameInPlayPersistKey);
 * startAppListening({
 *   matcher: isGameInPlayRehydrate,
 *   effect(_action, { dispatch, getState }) { ... },
 * });
 *
 * // slice extraReducers — narrow the payload type
 * const isOwnRehydrate = isRehydrateFor<
 *   typeof gameInPlayPersistKey,
 *   Pick<GameInPlaySliceState, "savedGames">
 * >(gameInPlayPersistKey);
 * builder.addMatcher(isOwnRehydrate, (state, action) => {
 *   // action.payload is typed as { savedGames: ... } | undefined
 * });
 * ```
 */
export const isRehydrateFor =
  <K extends string, P = unknown>(persistKey: K) =>
  (action: Action): action is RehydrateActionFor<K, P> =>
    action.type === REHYDRATE &&
    (action as Action & { key?: string }).key === persistKey;
