import React from "react"
import { Link } from "react-router-dom"
import LinkPropsWithName from "../interfaces/LinkPropsAndName"
import { v4 as uuidv4 } from "uuid"

const links: Array<LinkPropsWithName> = [
	{ to: "/", name: "home" },
	{ to: "/todo-list", name: "Todo List" },
]

export default function Navbar() {
	return (
		<nav className="flex justify-between h-20 px-12  bg-gray-200 dark:(bg-gray-900 text-bg-gray-300) ">
			<ul className="flex w-4/5 text-gray-500 ">
				{links.map(({ to, name }) => (
					<li className="px-2 py-6 capitalize " key={uuidv4()}>
						<Link
							to={to}
							className="
							text-current border-1 border-dotted border-transparent hover:border-current active:text-gray-500 visited:(text-red-600)"
						>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
