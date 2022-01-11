import React, { FunctionComponent } from "react"

import reactIcon from "../assets/react_icon.png"

const Home: FunctionComponent = () => {
	return (
		<div className="mt-4">
			<div className="flex flex-col items-center justify-between font-serif h-xl">
				<h1 className="py-10 text-4xl ">This is the Home Page</h1>
				<p
					className="
				transform
				selection:(bg-gray-700 text-gray-300)
				hover:text-gray-400"
				>
					This is react with {"  "}
					<a
						className="text-xl
						border-b-2 border-current
						hover:(text-gray-700 bg-gray-200)
						active:(text-gray-800 bg-gray-300)"
						href="https://windicss.org"
					>
						windi css
					</a>
				</p>

				<div className="w-1/6 h-1/6 animate-ping animation-duration-75 animate-delay-75">
					<img
						src={reactIcon}
						className="flex object-cover w-full h-full"
						alt="React Icon"
					/>
				</div>
			</div>
			<footer />
		</div>
	)
}

export default Home
