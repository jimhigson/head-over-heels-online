import type {
  Action,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

import { useCallback } from "react";

import { useAppDispatch } from "./hooks";

export function useDispatchActionCallback<Payload>(
  actionCreator: ActionCreatorWithPayload<Payload>,
  payload: NoInfer<Payload>,
): () => void;
export function useDispatchActionCallback(
  actionCreator: ActionCreatorWithoutPayload,
  payload?: never,
): () => void;
export function useDispatchActionCallback<Payload>(
  actionCreator:
    | ActionCreatorWithoutPayload
    | ActionCreatorWithPayload<Payload>,
  payload: NoInfer<Payload>,
) {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch((actionCreator as (p: Payload) => Action)(payload));
  }, [actionCreator, dispatch, payload]);
}
