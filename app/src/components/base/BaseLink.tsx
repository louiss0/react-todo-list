import React, { FunctionComponent } from "react"
import { Link, LinkProps } from "react-router-dom"

type BaseLinkProps = { extraClasses: string } & LinkProps

export const BaseLink: FunctionComponent<BaseLinkProps> = ({
	children,
	to,
	replace,
	state,
	extraClasses = "",
}) => {
	return (
		<Link
			to={to}
			state={state}
			replace={replace}
			className={`no-underline text-current ${extraClasses}`}
		>
			{children}
		</Link>
	)
}
