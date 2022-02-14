import React, { FunctionComponent } from "react"

type BaseContainerProps = {
	extraClasses?: string
}

const BaseContainer: FunctionComponent<BaseContainerProps> = ({
	extraClasses,
	children,
}) => {
	return (
		<div className={`w-4/5 mx-auto max-w-screen-lg ${extraClasses}`}>
			{children}
		</div>
	)
}
export default BaseContainer
