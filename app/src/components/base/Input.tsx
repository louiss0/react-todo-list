import React, { DetailedHTMLProps, Fragment } from "react"
import useInput from "../../hooks/useInput"
interface MandatoryInputProps {
	label: string
	name: string
	initValue?: string
	placeholder: string
	inputClassName: string
}

type InputProps = MandatoryInputProps &
	DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		inputClassName,
		label,
		placeholder,
		name,
		initValue = "",
		...attrs
	} = props

	const { value, handleChange } = useInput(initValue)

	return (
		<Fragment>
			<label htmlFor={name} className="capitalize">
				{label}
			</label>
			<input
				id={name}
				name={name}
				ref={ref}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className={` ${inputClassName}`}
				{...attrs}
			/>
		</Fragment>
	)
})

export default Input
