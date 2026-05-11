import React from "react";

type State = {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
{ children: React.ReactNode },
State
> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-fallback">
                    <h2>Something went wrong</h2>
                    <p>Please refresh the page</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;