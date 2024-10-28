import { Action } from "./listenForInput";

/** The currently pressed input, to be processed on the next tick */
export type InputState = Record<Action, boolean>;
