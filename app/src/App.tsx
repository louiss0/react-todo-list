import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary"
import generateLazyLoadedCompnentWrappedWithSuspense from "./components/generateLazyLoadedCompnentWrappedWithSuspense"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./contexts/AuthContext"

// Always use webpack chunk name as shown here \/

const [home, about] = [
	generateLazyLoadedCompnentWrappedWithSuspense(
		import(/* webpackChunkName: "home"  */ "./pages/Home")
	),
	generateLazyLoadedCompnentWrappedWithSuspense(
		import(/* webpackChunkName: "about"  */ "./pages/About")
	),
]

export default function App() {
	return (
		<ErrorBoundary>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<main>
						<Routes>
							<Route path="/" element={home} />
							<Route path="/about" element={about} />
						</Routes>
					</main>
				</BrowserRouter>
			</AuthProvider>
		</ErrorBoundary>
	)
}
