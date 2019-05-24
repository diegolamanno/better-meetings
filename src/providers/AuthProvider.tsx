import React, { FC, useState, useEffect, createContext, ReactNode } from 'react'
import { WebAuth, Auth0DecodedHash, Auth0Error } from 'auth0-js'
import jwtDecode from 'jwt-decode'
import { JWTPayload } from '../types'

const STORAGE_KEY = 'auth'

const { callbackPath, returnTo, ...auth0Config } = CONFIG.auth

const auth0 = new WebAuth(auth0Config)

const setSession = (idToken: string) => {
	localStorage.setItem(STORAGE_KEY, idToken)
}

const getSession = () => {
	const value = localStorage.getItem(STORAGE_KEY)
	if (value) {
		return value
	}
}

type UnauthenticatedState = {
	isAuthenticated: false
	idToken?: string
	userData?: JWTPayload
}

type AuthenticatedState = {
	idToken: string
	isAuthenticated: true
	userData: JWTPayload
	renewalTimer: number
}

type State = UnauthenticatedState | AuthenticatedState

type UnauthenticatedContextType = UnauthenticatedState & {
	login: () => void
	handleAuthentication: () => void
}

export type AuthenticatedContextType = AuthenticatedState & {
	logout: (err?: Auth0Error | null) => void
}

type ContextType = UnauthenticatedContextType | AuthenticatedContextType

export const AuthContext = createContext<ContextType>({
	isAuthenticated: false,
	login: () => {},
	handleAuthentication: () => {},
})

const AuthProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const idToken = getSession()
	const userData = idToken ? jwtDecode<JWTPayload>(idToken) : undefined
	const [state, setState] = useState<State>({
		idToken,
		userData,
		isAuthenticated: false,
	})

	useEffect(() => {
		if (!state.isAuthenticated && state.idToken) {
			renewTokens()
		}
	}, [state.isAuthenticated])

	const login: UnauthenticatedContextType['login'] = () => {
		auth0.authorize()
	}

	const handleAuthentication: UnauthenticatedContextType['handleAuthentication'] = () => {
		auth0.parseHash(processsAuthResult)
	}

	const renewTokens = () => {
		auth0.checkSession({}, processsAuthResult)
	}

	const processsAuthResult = (
		err: Auth0Error | null,
		authResult: Auth0DecodedHash | null,
	) => {
		if (
			authResult &&
			authResult.idToken &&
			authResult.idTokenPayload &&
			authResult.expiresIn
		) {
			setSession(authResult.idToken)
			setState({
				isAuthenticated: true,
				userData: authResult.idTokenPayload,
				idToken: authResult.idToken,
				renewalTimer: scheduleRenewal(authResult.expiresIn),
			})
		} else {
			logout(err)
		}
	}

	const scheduleRenewal = (expiresIn: number) =>
		window.setTimeout(renewTokens, expiresIn * 1000)

	const logout: AuthenticatedContextType['logout'] = err => {
		// Clear Access Token and ID Token from local storage
		localStorage.removeItem(STORAGE_KEY)
		if (state.isAuthenticated) {
			window.clearTimeout(state.renewalTimer)
			setState({
				isAuthenticated: false,
			})
		}

		if (!err) {
			auth0.logout({
				returnTo,
			})
		}
	}

	const contextValue = state.isAuthenticated
		? {
				...state,
				logout,
		  }
		: {
				...state,
				login,
				handleAuthentication,
		  }

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider
