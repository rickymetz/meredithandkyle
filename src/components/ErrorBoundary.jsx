import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-md mx-auto px-6 py-16 text-center">
          <h1 className="font-serif text-2xl text-wine mb-4">Something went wrong</h1>
          <p className="text-brown/70 font-sans mb-6">
            Sorry about that! Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="py-3 px-8 rounded-lg bg-wine text-cream-light font-sans font-semibold hover:bg-maroon transition-all"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
