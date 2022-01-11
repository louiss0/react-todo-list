import React, {
	FunctionComponent,
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useMemo,
} from "react"
import ReactDOM from "react-dom"

interface ModalProps {
	show: boolean
	className?: string
	closeFunction: () => void
}

const [modalRoot, root] = [
	document.getElementById("modal-root"),
	document.getElementById("app"),
]
type KeyOrMouseEvent =
	| KeyboardEvent<HTMLDivElement>
	| MouseEvent<HTMLDivElement>

const Modal: FunctionComponent<ModalProps> = props => {
	const { show, className, children, closeFunction } = props

	function closeBackdrop(event: KeyOrMouseEvent): void {
		const { currentTarget, target } = event

		if (currentTarget === target) {
			closeFunction()
		}
	}

	function closeBackdropIfTheEscKeyIsPressed(event: globalThis.KeyboardEvent) {
		const { key } = event

		if (key === "Escape") {
			closeFunction()
		}
	}

	useEffect(() => {
		addEventListener("keydown", closeBackdropIfTheEscKeyIsPressed)

		return () => {
			removeEventListener("keydown", closeBackdropIfTheEscKeyIsPressed)
		}
	}, [])

	const display = useMemo(() => (!show ? "none" : "block"), [show])

	const backdrop = (
		<div
			className={`absolute inset-0 opacity-60 flex flex-col bg-gray-900  ${
				className || ""
			}`}
			aria-hidden="true"
			onClick={closeBackdrop}
			style={{ display }}
		>
			{children}
		</div>
	)

	let container

	if (!modalRoot && root) {
		container = root
	} else if (modalRoot) {
		container = modalRoot
	} else if (!root) {
		throw Error("App not started ")
	} else {
		container = root
	}

	return ReactDOM.createPortal(backdrop, container, "modal")
}

export default Modal
