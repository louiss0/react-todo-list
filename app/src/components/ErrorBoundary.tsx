import React, { Component, ErrorInfo } from "react"

interface ErrorBoundaryState {
	hasError: false
}

export default class ErrorBoundary extends Component<
	Record<string, unknown>,
	ErrorBoundaryState
> {
	constructor(props: Record<string, unknown>) {
		super(props)

		this.state = {
			hasError: false,
		}
	}

	static getDerivedStateFromError() {
		return {
			hasError: true,
		}
	}

	override componentDidCatch(error: Error, info: ErrorInfo) {
		console.error(error)

		console.table(info)
	}

	override render() {
		if (this.state.hasError) {
			return (
				<div
					className="flex flex-col items-center justify-center w-full h-full px-4 py-3"
					aria-label="error-message"
				>
					Somethng went wrong
				</div>
			)
		}

		return this.props.children
	}
}
