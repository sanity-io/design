import React from 'react'
import {Code} from '../primitives'

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export interface ErrorBoundaryProps {
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
}

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export interface ErrorBoundaryState {
  error: Error | null
}

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {error: null}

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return {error}
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.props.onCatch({error, info})
  }

  render(): React.ReactNode {
    const {error} = this.state

    if (error) {
      return <Code>{error.message}</Code>
    }

    return this.props.children
  }
}
