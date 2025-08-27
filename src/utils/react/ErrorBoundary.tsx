import { Component, type ReactElement, type ReactNode } from "react";

/**
 * Minimal error boundary component that catches JavaScript errors in child components.
 *
 * What it does:
 * - Catches errors during rendering, in lifecycle methods, and in constructors of the whole tree below
 * - Displays the provided fallback UI when an error occurs
 *
 * What it does NOT provide:
 * - No error logging or reporting
 * - No retry/reset functionality
 * - No error details passed to fallback
 * - No recovery mechanism - once errored, stays errored until parent re-renders
 * - Does not catch errors in event handlers, async code, or during SSR
 */
interface Props {
  children: ReactNode;
  /**
   * The UI to display when an error is caught.
   * Must be a ReactElement, not a function or component.
   */
  fallback: ReactElement;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
