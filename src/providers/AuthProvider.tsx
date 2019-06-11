import React, { FC, useState, useEffect, createContext, ReactNode } from 'react'
import { WebAuth, Auth0DecodedHash, Auth0Error } from 'auth0-js'
import jwtDecode from 'jwt-decode'
import { JWTPayload } from '../types'

enum StorageKey {
	token = 'idToken',
	expiry = 'expiry',
}

const { callbackPath, returnTo, pem, ...auth0Config } = CONFIG.auth

const auth0 = new WebAuth(auth0Config)

const setSession = (idToken: string, expiresIn: number) => {
	localStorage.setItem(StorageKey.token, idToken)
	localStorage.setItem(
		StorageKey.expiry,
		`${expiresIn * 1000 + new Date().getTime()}`,
	)
}

const getSession = () => {
	const idToken = localStorage.getItem(StorageKey.token)
	const expiry = localStorage.getItem(StorageKey.expiry)
	if (idToken && expiry) {
		const expiresIn = parseInt(expiry, 10) - Date.now()
		return {
			idToken,
			expiresIn,
		}
	}
}

const clearSession = () => {
	localStorage.removeItem(StorageKey.token)
	localStorage.removeItem(StorageKey.expiry)
}

type Base = {
	ready: boolean
}

type UnauthenticatedState = Base & {
	isAuthenticated: false
	idToken?: string
	userData?: JWTPayload
}

type AuthenticatedState = Base & {
	isAuthenticated: true
	idToken: string
	userData: JWTPayload
	renewalTimer: number
}

type State = UnauthenticatedState | AuthenticatedState

type UnauthenticatedContextType = UnauthenticatedState & {
	login: () => void
	handleAuthentication: () => void
}

export type AuthenticatedContextType = Pick<
	AuthenticatedState,
	'ready' | 'isAuthenticated' | 'idToken' | 'userData'
> & {
	logout: (err?: Auth0Error | null) => void
}

type ContextType = UnauthenticatedContextType | AuthenticatedContextType

export const AuthContext = createContext<ContextType>({
	ready: false,
	isAuthenticated: false,
	login: () => {},
	handleAuthentication: () => {},
})

const AuthProvider: FC<{
	children: ReactNode
}> = ({ children }) => {
	const [state, setState] = useState<State>({
		ready: false,
		isAuthenticated: false,
	})

	const setAuthenticatedState = (
		idToken: string,
		userData: JWTPayload,
		expiresIn: number,
	) => {
		setSession(idToken, expiresIn)
		setState({
			idToken,
			userData,
			ready: true,
			renewalTimer: window.setTimeout(renewTokens, expiresIn * 1000),
			isAuthenticated: true,
		})
	}

	useEffect(() => {
		const session = getSession()
		if (session) {
			if (session.expiresIn <= 0) {
				renewTokens()
			} else {
				setAuthenticatedState(
					session.idToken,
					jwtDecode(session.idToken),
					session.expiresIn,
				)
			}
		} else {
			setState({
				ready: true,
				isAuthenticated: false,
			})
		}
	}, [])

	const login = () => {
		auth0.authorize()
	}

	const handleAuthentication = () => {
		auth0.parseHash(processsAuthResult)
	}

	const renewTokens = () => {
		setState({
			...state,
			ready: false,
		})
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
			setAuthenticatedState(
				authResult.idToken,
				authResult.idTokenPayload,
				authResult.expiresIn,
			)
		} else {
			logout(err)
		}
	}

	const logout: AuthenticatedContextType['logout'] = err => {
		clearSession()

		if (state.isAuthenticated) {
			window.clearTimeout(state.renewalTimer)
		}
		setState({
			isAuthenticated: false,
			ready: true,
		})

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
