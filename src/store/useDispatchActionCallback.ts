import {
  type Action,
  type ActionCreatorWithoutPayload,
  type ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { useCallback } from "preact/hooks";

import { useAppDispatch } from "./hooks";
import { type AppThunk } from "./store";

export function useDispatchActionCallback<Payload>(
  actionCreator: ActionCreatorWithPayload<Payload>,
  payload: NoInfer<Payload>,
): () => void;
export function useDispatchActionCallback(
  actionCreator: ActionCreatorWithoutPayload,
  payload?: never,
): () => void;
export function useDispatchActionCallback(
  actionCreator: () => AppThunk,
  payload?: never,
): () => void;
export function useDispatchActionCallback<Payload>(
  actionCreator: (p: Payload) => AppThunk,
  payload?: NoInfer<Payload>,
): () => void;
export function useDispatchActionCallback<Payload>(
  actionCreator: (p: Payload) => Action | AppThunk,
  payload: NoInfer<Payload>,
) {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(actionCreator(payload));
  }, [dispatch, actionCreator, payload]);
}
