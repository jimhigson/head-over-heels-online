import { Component, type ErrorInfo } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { type EmptyObject } from "type-fest";

import { errorCaught } from "../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../store/store";
import { createSerialisableErrors } from "../redux/createSerialisableErrors";

type ErrorBoundaryProps = PropsWithChildren<EmptyObject>;

export class DispatchingErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static override getDerivedStateFromError() {
    // TODO: are state updates even needed since it doesn't change the rendering?
    return { hasError: true };
  }

  override componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error("Error caught in DispatchingErrorBoundary:", error);
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
