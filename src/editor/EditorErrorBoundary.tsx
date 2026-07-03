import { type UnknownAction } from "@reduxjs/toolkit";
import { Component, type ErrorInfo } from "preact";
import { type PropsWithChildren } from "preact/compat";

import {
  createSerialisableErrors,
  type SerialisableError,
} from "../utils/redux/createSerialisableErrors";
import { EditorNonIdealState } from "./editorDialogs/EditorNonIdealState";

type ResetPredicate = (
  action: UnknownAction,
  currentState: unknown,
  previousState: unknown,
) => boolean;

export type EditorErrorBoundaryProps = PropsWithChildren<{
  resetPredicate?: ResetPredicate;
  startListening?: (options: {
    predicate: ResetPredicate;
    effect: () => void;
  }) => () => void;
  asDialog?: boolean;
  componentName?: string;
}>;

type EditorErrorBoundaryState = {
  errors: SerialisableError[] | undefined;
};

export class EditorErrorBoundary extends Component<
  EditorErrorBoundaryProps,
  EditorErrorBoundaryState
> {
  #unsubscribe: (() => void) | undefined;

  constructor(props: EditorErrorBoundaryProps) {
    super(props);
    this.state = { errors: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { errors: createSerialisableErrors(error) };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error("Error caught in EditorErrorBoundary:", error);
  }

  componentDidUpdate(
    _prevProps: EditorErrorBoundaryProps,
    prevState: EditorErrorBoundaryState,
  ) {
    if (this.state.errors && !prevState.errors) {
      this.#startListening();
    } else if (!this.state.errors && prevState.errors) {
      this.#stopListening();
    }
  }

  componentWillUnmount() {
    this.#stopListening();
  }

  #startListening() {
    this.#stopListening();
    const { resetPredicate, startListening } = this.props;
    if (resetPredicate && startListening) {
      this.#unsubscribe = startListening({
        predicate: resetPredicate,
        effect: () => this.setState({ errors: undefined }),
      });
    }
  }

  #stopListening() {
    this.#unsubscribe?.();
    this.#unsubscribe = undefined;
  }

  render() {
    const { errors } = this.state;

    if (errors !== undefined) {
      return (
        <EditorNonIdealState
          componentName={this.props.componentName ?? "Level Editor"}
          errors={errors}
          onDismiss={() => this.setState({ errors: undefined })}
          asDialog={this.props.asDialog}
        />
      );
    }

    return this.props.children;
  }
}
