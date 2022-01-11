import { useState } from "react"

export default function useBoolean(initBoolean = false) {
	const [boolean, setBoolean] = useState(initBoolean)

	function setToTrue() {
		setBoolean(true)
	}
	function setToFalse() {
		setBoolean(false)
	}
	function toggle() {
		setBoolean(value => !value)
	}

	return {
		boolean,
		setToTrue,
		setToFalse,
		toggle,
	}
}
