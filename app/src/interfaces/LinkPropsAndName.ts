import { LinkProps } from "react-router-dom"

export default interface LinkPropsWithName extends LinkProps {
	name: string
}
