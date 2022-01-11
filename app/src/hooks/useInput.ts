import { ChangeEventHandler, useState } from "react"

export default function useInput(initValue = "") {
	const [value, setValue] = useState(initValue)

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		setValue(event.target.value)
	}

	return {
		get value() {
			return value
		},
		handleChange,
	}
}
