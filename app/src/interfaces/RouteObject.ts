import { ReactElement } from "react"
import { RouteProps } from "react-router"

interface RouteObject extends RouteProps {
	path: string
	element: ReactElement
}

type RouteObjects = Array<RouteObject>

export { RouteObject, RouteObjects }
