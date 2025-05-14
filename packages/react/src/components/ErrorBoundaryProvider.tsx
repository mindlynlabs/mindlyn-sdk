import { ReactNode, Component, ErrorInfo, PropsWithChildren } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ChatErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Mindlyn] Error in chat:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='p-4 text-center text-red-600'>
          Something went wrong in the chat. Please try reloading the page.
        </div>
      )
    }
    return this.props.children
  }
}

export function ErrorBoundaryProvider({ children }: PropsWithChildren) {
  return <ChatErrorBoundary>{children}</ChatErrorBoundary>
}
