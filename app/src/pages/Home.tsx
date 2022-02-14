import React, { FunctionComponent } from "react"
import BaseContainer from "../components/base/BaseContainer"

const Home: FunctionComponent = () => {
	return (
		<div className="p-15">
			<BaseContainer>
				<h1 className="text-5xl mt-10 mb-12">Welcome to the To do list app </h1>

				<p className="text-2xl">
					Click on the to do list link to fill out your to do list for to day
				</p>
			</BaseContainer>
		</div>
	)
}

export default Home
