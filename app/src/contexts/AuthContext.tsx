import React, { FunctionComponent, useMemo, useState } from "react"

interface AuthContextConfig {
	token: string | null
	isLoggedIn: boolean
	logIn(token: string): void
	logOut(): void
	getParsedTokenFromLocalStorage(): Record<string, unknown>
}

const AuthContext = React.createContext({} as AuthContextConfig)

const AuthProvider: FunctionComponent = ({ children }) => {
	const [token, setToken] = useState<string | null>(null)

	const isLoggedIn = useMemo(() => !!token, [token])

	function getParsedTokenFromLocalStorage(): Record<string, unknown> {
		const token = localStorage.getItem("token")

		if (token) {
			return JSON.parse(token)
		}

		throw Error(`No token in local storage ${token}`)
	}

	const authContextConfig = {
		get token() {
			return token
		},
		get isLoggedIn() {
			return isLoggedIn
		},
		logIn(token: string) {
			localStorage.setItem("token", token)
			setToken(token)
		},
		logOut() {
			localStorage.removeItem("token")
			setToken(null)
		},
		getParsedTokenFromLocalStorage,
	}

	return (
		<AuthContext.Provider value={authContextConfig}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
