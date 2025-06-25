"use client";

import React from "react";
import { store } from "@/routers/store";
import { Provider } from "react-redux";

import { AuthProvider } from "@/contexts/auth-context";

interface ReduxProviderProps {
	children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps): React.JSX.Element {
	return (
		<Provider store={store}>
			<AuthProvider>{children}</AuthProvider>
		</Provider>
	);
}
