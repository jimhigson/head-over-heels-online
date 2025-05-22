import type { ErrorInfo, PropsWithChildren } from "react";
import { Component } from "react";
import type { EmptyObject } from "type-fest";
import { errorCaught } from "../../store/slices/gameMenusSlice";
import { store } from "../../store/store";
import { createSerialisableErrors } from "../redux/createSerialisableErrors";

type ErrorBoundaryProps = PropsWithChildren<EmptyObject>;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    store.dispatch(errorCaught(createSerialisableErrors(error)));
  }

  render() {
    // note that we keep rendering the error'd component - the hope is that
    // dispatching the error to the store will now cause the app to render
    // the error dialog instead
    //if (!this.state.hasError) {
    return this.props.children;
    //}
  }
}
