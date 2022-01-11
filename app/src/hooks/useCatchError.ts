import { useMemo, useState } from "react"

export default function useCatchError() {
	const [error, setError] = useState<Error | null>(null)

	const errorExists = useMemo(() => !!error, [error])

	function catchError(error: Error) {
		setError(error)
	}

	function clearError() {
		setError(null)
	}

	return {
		get error() {
			return error
		},
		get errorExists() {
			return errorExists
		},
		catchError,
		clearError,
	}
}
