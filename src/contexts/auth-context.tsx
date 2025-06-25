"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useLoginMutation } from "@/routers/auth-api";
import type { LoginRequest, User } from "@/routers/auth-api";
import { loginSuccess, logout, selectAuth, selectIsAuthenticated, selectUser } from "@/routers/auth-slice";
import type { AppDispatch } from "@/routers/store";
import { useDispatch, useSelector } from "react-redux";

interface AuthContextType {
	// State
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;

	// Actions
	login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
	const dispatch = useDispatch<AppDispatch>();
	const _authState = useSelector(selectAuth);
	const user = useSelector(selectUser);
	const isAuthenticated = useSelector(selectIsAuthenticated);

	const [loginMutation, { isLoading }] = useLoginMutation();

	const handleLogin = async (credentials: LoginRequest): Promise<{ success: boolean; error?: string }> => {
		try {
			const result = await loginMutation(credentials).unwrap();

			if (result.succeeded && result.item) {
				dispatch(
					loginSuccess({
						user: result.item,
						token: result.item.token,
					})
				);

				return { success: true };
			} else {
				return {
					success: false,
					error: result.message || "Login failed",
				};
			}
		} catch (error) {
			console.error("Login error:", error);
			return {
				success: false,
				error: error instanceof Error ? error.message : "An unexpected error occurred",
			};
		}
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const value: AuthContextType = {
		user,
		isAuthenticated,
		isLoading,
		login: handleLogin,
		logout: handleLogout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
