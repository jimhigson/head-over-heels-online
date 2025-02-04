import type {
  Action,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { useAppDispatch } from "./hooks";
import { useCallback } from "react";

export function useDispatchActionCallback<Payload>(
  actionCreator: ActionCreatorWithPayload<Payload>,
  payload: Payload,
): () => void;
export function useDispatchActionCallback(
  actionCreator: ActionCreatorWithoutPayload,
  payload?: never,
): () => void;
export function useDispatchActionCallback<Payload>(
  actionCreator:
    | ActionCreatorWithPayload<Payload>
    | ActionCreatorWithoutPayload,
  payload: Payload,
) {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch((actionCreator as (p: Payload) => Action)(payload));
  }, [actionCreator, dispatch, payload]);
}
