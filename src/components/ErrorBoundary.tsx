/* eslint-disable react/no-unescaped-entities */
/* eslint-disable class-methods-use-this */
import React, { Component, ErrorInfo, ReactNode } from 'react';
// import Button from './shared/button';
// import Heading from './shared/heading';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="z-50 flex h-screen flex-col bg-black px-8 text-center">
          Error aagaya bhaiya !!
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
