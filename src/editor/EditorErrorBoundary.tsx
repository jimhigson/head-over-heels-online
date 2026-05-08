import type { ErrorInfo, PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";

import { Component } from "react";

import type { SerialisableError } from "../utils/redux/createSerialisableErrors";

import { createSerialisableErrors } from "../utils/redux/createSerialisableErrors";
import { EditorErrorDialog } from "./editorDialogs/EditorErrorDialog";

type EditorErrorBoundaryState = {
  errors: SerialisableError[] | undefined;
};

export class EditorErrorBoundary extends Component<
  PropsWithChildren<EmptyObject>,
  EditorErrorBoundaryState
> {
  constructor(props: PropsWithChildren<EmptyObject>) {
    super(props);
    this.state = { errors: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { errors: createSerialisableErrors(error) };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error("Error caught in EditorErrorBoundary:", error);
  }

  render() {
    const { errors } = this.state;

    if (errors !== undefined) {
      return (
        <EditorErrorDialog
          errors={errors}
          onDismiss={() => this.setState({ errors: undefined })}
        />
      );
    }

    return this.props.children;
  }
}
