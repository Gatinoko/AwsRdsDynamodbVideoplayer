import React, { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

export type AuthInformation = {
	isAuthenticated: boolean;
	email: undefined;
	username: undefined;
	id: undefined;
};

export const AuthContext = createContext({
	authInformation: {
		isAuthenticated: false,
		email: undefined,
		username: undefined,
		id: undefined,
	},
	setAuthInformation: (value: AuthInformation) => {},
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
	const [authInformation, setAuthInformation] = useState<AuthInformation>({
		isAuthenticated: false,
		email: undefined,
		username: undefined,
		id: undefined,
	});

	return (
		<AuthContext.Provider value={{ authInformation, setAuthInformation }}>
			{children}
		</AuthContext.Provider>
	);
}
