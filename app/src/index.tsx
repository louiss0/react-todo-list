import React from "react"
import { render } from "react-dom"
import App from "./App"
import "windi.css"
import "./main.css"

const app = document.getElementById("app")

if (app) {
	const reactApp = (
		<React.StrictMode>
			<App />,
		</React.StrictMode>
	)

	render(reactApp, app)
} else {
	document.body.innerHTML = `
    <h1>
    You selected the wrong element please use one with an id instead !!!
    </h1>
    
    `
}
